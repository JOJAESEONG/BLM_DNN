module.exports = {
    HTML: function (body, authStatusUI) {
      return `
      <!doctype html>
      <html>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&amp;display=swap" rel="stylesheet">
      <link href="../../vendors/simplebar/simplebar.min.css" rel="stylesheet">
      <link href="../../assets/css/theme-rtl.min.css" rel="stylesheet" id="style-rtl">
      <link href="../../assets/css/theme.min.css" rel="stylesheet" id="style-default">
      <link href="../../assets/css/user-rtl.min.css" rel="stylesheet" id="user-style-rtl">
      <link href="../../assets/css/user.min.css" rel="stylesheet" id="user-style-default">
      <meta name="msapplication-TileImage" content="../../assets/img/favicons/mstile-150x150.png">
      <meta name="theme-color" content="#ffffff">
      <script src="../../assets/js/config.js"></script>
      <script src="../../vendors/simplebar/simplebar.min.js"></script>
      <script src="../../vendors/choices/choices.min.js"></script>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&amp;display=swap" rel="stylesheet">
      <link href="../../vendors/simplebar/simplebar.min.css" rel="stylesheet">
      <link href="../../assets/css/theme-rtl.min.css" rel="stylesheet" id="style-rtl">
      <link href="../../assets/css/theme.min.css" rel="stylesheet" id="style-default">
      <link href="../../assets/css/user-rtl.min.css" rel="stylesheet" id="user-style-rtl">
      <link href="../../assets/css/user.min.css" rel="stylesheet" id="user-style-default">
      <link href="../../vendors/choices/choices.min.css" rel="stylesheet" />
      <script>
        var isRTL = JSON.parse(localStorage.getItem('isRTL'));
        if (isRTL) {
          var linkDefault = document.getElementById('style-default');
          var userLinkDefault = document.getElementById('user-style-default');
          linkDefault.setAttribute('disabled', true);
          userLinkDefault.setAttribute('disabled', true);
          document.querySelector('html').setAttribute('dir', 'rtl');
        } else {
          var linkRTL = document.getElementById('style-rtl');
          var userLinkRTL = document.getElementById('user-style-rtl');
          linkRTL.setAttribute('disabled', true);
          userLinkRTL.setAttribute('disabled', true);
        }
      </script>

      <head>    
        <title>DNN model for BLM vol.1 - Login</title>
        <meta charset="utf-8">
      </head>
      <body>
        <div class="container" data-layout="container">
        <script>
        var isFluid = JSON.parse(localStorage.getItem('isFluid'));
        if (isFluid) {
          var container = document.querySelector('[data-layout]');
          container.classList.remove('container');
          container.classList.add('container-fluid');
        }
        </script>
        <div class="card mb-3" style="text-align: center; max-width: 35rem;" >        
          ${authStatusUI}
          ${body}
        </div>
        </div>
      </body>
      </html>
      `;
    }
  }