/* Meta Pixel for the bridge pages.
   Pixel ID is set below. Each page fires PageView + ViewContent on load.
   Tapping the Amazon button fires the standard InitiateCheckout event
   (selectable as an ad conversion event) plus a custom "AmazonClick". */
(function () {
  var META_PIXEL_ID = '1477863464188683';

  var tag = document.currentScript;
  var book = (tag && tag.getAttribute('data-book')) || document.title;
  if (!META_PIXEL_ID) return;

  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
  fbq('track', 'ViewContent', { content_name: book, content_type: 'product', content_category: 'Book' });

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-amazon]');
    if (!a) return;
    e.preventDefault();
    fbq('track', 'InitiateCheckout', { content_name: book, content_category: 'Book' });
    fbq('trackCustom', 'AmazonClick', { content_name: book });
    // Short pause so the event is sent before the browser leaves the page.
    setTimeout(function () { window.location.href = a.href; }, 250);
  });
})();
