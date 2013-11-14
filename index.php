<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>SFF text</title>
        <!--<meta name="description" content="This is iFramed content for stuff.co.nz">-->
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        
    </head>
    
    <body>

        <div class="sff-wrapper">

            <div class="intro">

                <ul class="description clear-fix">
                    <li class="left">
                        The first annual Silver Fern Farms Premier Selection Awards is about providing New Zealand’s best chefs with the finest quality cuts of Silver Fern Farms red meat to create the country’s most memorable taste experiences.  At Silver Fern Farms we are passionate about celebrating these experiences and the chefs that make them happen. Now we want to share this with food lovers all over the country.
                    </li>
                    <li class="vert-divider"></li>
                    <li class="right">
                        To enter, we asked chefs to create a dish using one of our finest Silver Fern Farms lamb, beef and venison cuts or SILERE alpine origin merino cuts and place it on their menu over Spring. A team of esteemed food critics overseen by judging coordinator Kerry Tyack and Silver Fern Farms Master Grader Andrea Garmyn will judge the dishes and from here will announce the 8 finalists and in early 2014 the winner, who will be awarded the title of New Zealand’s Premier Master of Fine Cuisine.
                    </li>
                </ul>

                <ul class="call-to-action">
                    <li class="top">
                        The awards are a showcase of the talent, artistry and expertise of the country’s best chefs, proving that the finest ingredients in the most talented hands do indeed create something truly extraordinary.
                    </li>
                    <li class="bottom">
                        To experience these dishes look for a participating restaurant in your area:
                    </li>                    
                </ul>
            </div>

            <div class="map-container">

                <div class="modal">
                    <div class="close rnd-btn"></div>
                    <div class="data"></div>
                </div>

                <div class="region-map">

                    <div id="paper"></div>
                    <ul class="land-mass">
                        <li data-num="0"></li>
                        <li data-num="1"></li>
                        <li data-num="2"></li>
                        <li data-num="3"></li>
                        <li data-num="4"></li>
                    </ul>

                </div>
                

                <ul class="region-list">
                    <li data-num="0">Upper North</li><!--
                    --><li data-num="1">Center North</li><!--
                    --><li data-num="2">Lower North</li><!--
                    --><li data-num="3">Upper South</li><!--
                    --><li data-num="4">Lower South</li>
                </ul>

                <div class="slider-container">

                    <div class="slider-images"></div>

                    <div class="footer-shell"></div> <!-- set as DOM element and not pseudo element due to IE8 -->

                </div> <!-- end of slider container -->

            </div> <!-- end of map-container -->

            <div class="chef-container">
                <div class="scroll" data-dir="left">
                    <div class="gradient"></div> <!-- set as DOM element and not pseudo element due to IE8 -->
                    <div class="rnd-btn"></div>                    
                </div>
                <div class="scroll" data-dir="right">
                    <div class="gradient"></div> <!-- set as DOM element and not pseudo element due to IE8 -->
                    <div class="rnd-btn"></div>
                </div>
                <div class="scroll-container" data-seg="1">
                    <ul><!-- enter dymanic content via javascript here! --></ul>
                </div>
            </div>

            <footer>
                <ul class="clear-fix">
                    <li class="left"><a href="http://www.silverfernfarms.com/" target="_blank">silverfernfarms.com</a></li>
                    <li class="vert-divider"></li>
                    <li class="right">+64 6 872 6660</li>
                </ul>
            </footer>

        </div> <!-- sff-wrapper -->

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/vendor/raphael-min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.10.3/TweenMax.min.js"></script>
        <script src="js/main.js"></script>

    </body>

</html>
