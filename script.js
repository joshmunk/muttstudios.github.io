
document.addEventListener('DOMContentLoaded', function () 
{
    images.forEach(function (image) {
        image.addEventListener('click', function () {
            this.classList.toggle('expanded');
        });
    });

    var menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
            resetMenuItems(); // Reset menu items and associated content
            toggleList(this.dataset.list);
            this.classList.add('active'); // Optionally, add a class to indicate the active menu item
        });
    });
});

function refreshPage() {
    window.location.reload(true);
}

function toggleList(listId) {
    var list = document.getElementById(listId);
    var homepageImage = document.querySelector('.homepage-image img');
    var allLists = document.querySelectorAll('.hidden-list');

    allLists.forEach(function(item) {
        if (item !== list) {
            item.style.display = 'none';
        }
    });

    if (list.style.display === '' || list.style.display === 'none') {
        list.style.display = 'block';
        homepageImage.style.display = 'none'; // Hide the background image
    } else {
        list.style.display = 'none';
        homepageImage.style.display = 'block'; // Show the background image
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var footer = document.querySelector('.footer');
    var footerWidth = footer.offsetWidth;
    var footerHeight = footer.offsetHeight;
    var x = Math.random() * (window.innerWidth - footerWidth);
    var y = Math.random() * (window.innerHeight - footerHeight);
    var dx = 2; // Increase velocity in the horizontal direction
    var dy = 2; // Increase velocity in the vertical direction

    footer.addEventListener('click', function() {
        window.location.reload();
    });

    function moveFooter() {
        x += dx;
        y += dy;

        if (x + footerWidth >= window.innerWidth || x <= 0) {
            dx = -dx;
        }

        if (y + footerHeight >= window.innerHeight || y <= 0) {
            dy = -dy;
        }

        footer.style.left = x + 'px';
        footer.style.top = y + 'px';

        requestAnimationFrame(moveFooter);
    }

    moveFooter();

    
    function scatterImagesNoOverlapConstrained() {
      const galleryImages = document.querySelectorAll('.gallery-img');
      const padding = 40; // Space around each image
      const placedRects = [];
    
      // Define placement boundaries (e.g., center 60% of screen)
      const minX = window.innerWidth * 0.2;
      const maxX = window.innerWidth * 0.8;
      const minY = window.innerHeight * 0.2;
      const maxY = window.innerHeight * 0.8;
    
      galleryImages.forEach(img => {
        img.style.position = 'absolute';
        img.style.left = '0px';
        img.style.top = '0px';
        img.style.width = '200px'; // Set a fixed width
        img.style.height = 'auto';
    
        const imgWidth = img.offsetWidth + padding;
        const imgHeight = img.offsetHeight + padding;
        let maxAttempts = 200;
        let placed = false;
    
        while (!placed && maxAttempts > 0) {
          const randomLeft = Math.floor(
            Math.random() * (maxX - minX - imgWidth) + minX
          );
          const randomTop = Math.floor(
            Math.random() * (maxY - minY - imgHeight) + minY
          );
    
          const newRect = {
            left: randomLeft,
            top: randomTop,
            right: randomLeft + imgWidth,
            bottom: randomTop + imgHeight,
          };
    
          const overlap = placedRects.some(rect => {
            return !(
              newRect.right < rect.left ||
              newRect.left > rect.right ||
              newRect.bottom < rect.top ||
              newRect.top > rect.bottom
            );
          });
    
          if (!overlap) {
            img.style.left = `${randomLeft}px`;
            img.style.top = `${randomTop}px`;
            placedRects.push(newRect);
            placed = true;
          }
    
          
          maxAttempts--;
        }
    
        if (!placed) {
          console.warn('Could not place image without overlap after many attempts');
        }
      });
    }
    
    window.addEventListener('load', scatterImagesNoOverlapConstrained);
    
});

