/*jshint devel: true*/
/*global Modernizr: true*/
/*global Raphael: true*/
/*global TweenMax: true*/
/*global TimelineMax: true*/

if(Raphael){

	//alert('yes');

}

$(document).ready(function(){

	var $m = {

		init : function(){

			//$m.s.svg = $m.svgTest(); // test if the browser support SVG or not and store the result in the global setting obj (if not then it must use VML)
			$m.s.ltIe9 = $m.ltIe9();
			$m.regions.init(); // create the map shapes + add interactivity animations for the map and region list...
			$m.touchTest(); // test for user touch
			$m.chefs.init();
			$m.slider.init();
			$m.modal.init();

		}, // end of init fnc

		s : {

			ani : 0.25,

			atvReg : null,

			col : {
				'drkGray' : 'rgb(27, 27, 27)', // '#1b1b1b'
				'medGray' : 'rgb(77, 77, 77)', // '#4d4d4d'
				'lytGray' : 'rgb(204, 204, 204)', // '#cccccc'
				'drkBrown' : 'rbg(49, 39, 24)', // #312718
				'medBrown' : 'rgb(155, 126, 84)' // '#9b7e54'
			},

			'dat' : [
				{
					'region' : 'upper-north',
					'path' : 'M193.083,89c1.336-0.651,2.067-1.948,2.466-3.25s0.463-2.609,0.467-3.282c-0.014,0.264-0.059,0.5-0.139,0.715s-0.193,0.412-0.346,0.598c-0.281,0.344-0.797,0.398-1.289,0.418s-0.961,0.004-1.148,0.207s-0.805,0.375-1.352,0.277s-1.023-0.465-0.93-1.34s0.062-1.984-0.074-3.031s-0.379-2.031-0.707-2.656s-0.461-0.859-0.789-0.938s-0.852,0-1.961,0s-2.227-0.164-3.191-0.398s-1.777-0.539-2.277-0.82s-0.539-0.203-0.645-0.156s-0.277,0.062-1.043-0.344s-1.344-0.781-1.621-1.156s-0.254-0.75,0.184-1.156s0.359-1.25,0.098-2.117s-0.707-1.758-1.004-2.258s-0.734-1.414-0.887-2.559s-0.02-2.52,0.824-3.941s1.539-1.977,1.887-2.477s0.348-0.945-0.199-2.148s-0.867-1.367-1.238-1.48s-0.793-0.176-1.543-1.176s-1.578-2.039-2.293-2.965s-1.316-1.738-1.613-2.285s-0.695-1.086-0.762-1.68s0.199-1.242,1.23-2.008s1.172-2.016,0.941-3.172s-0.832-2.219-1.285-2.609s-1-0.891-1.254-1.289s-0.215-0.695,0.504-0.68s0.977-0.086,0.977-0.371s-0.258-0.754-0.57-1.473s-0.417-1.573-0.683-2.362s-0.692-1.513-1.651-1.971c-0.958-0.458-1.166-1.708-1.354-3.052s-0.354-2.781-1.229-3.614s-1.292-1.021-1.49-0.854c-0.198,0.167-0.178,0.688-0.178,1.271s-0.438,0.604-0.969,0.667s-1.156,0.167-1.531,0.917s-1,0.604-1.438,0.114c-0.438-0.489-0.688-1.323-0.312-1.948s0.375-1.271,0.125-1.906s-0.75-1.26-1.375-1.844s-0.938-1.042-1.375-1.469s-1-0.823-2.125-1.281s-2.062-0.5-2.854-0.583c-0.791-0.083-1.438-0.208-1.979-0.833c-0.542-0.625-1.167-1.354-1.729-1.864c-0.562-0.511-1.062-0.802-1.354-0.552s-0.438,1.146-0.698,1.823s-0.636,1.135-1.386,0.51s-0.896-1.229-0.896-1.844c0.001-0.615,0.146-1.24-0.021-1.906s-0.438-0.354-0.761,0.198c-0.323,0.552-0.698,1.343-1.073,1.635s-1.229,0.396-2.031,0.062c-0.802-0.333-1.552-1.104-1.719-2.562c-0.166-1.458-0.687-2.167-1.312-2.656c-0.626-0.49-1.354-0.761-1.938-1.344c-0.583-0.583-1.208-0.812-1.75-1.156s-1-0.802-1.25-1.844s0.292-1.583,0.917-2.052c0.625-0.468,1.333-0.864,1.417-1.614s-0.104-0.75-0.677-0.667c-0.573,0.083-1.531,0.25-2.989-0.167s-2.396-0.75-2.99-0.844S129,0.458,128.917,1s-0.875,0.542-1.614,0.625c-0.74,0.083-1.427,0.25-1.302,1.125s1.5,1.896,3.021,2.938c1.521,1.042,3.188,2.104,3.896,3.062s1.208,2.188,1.75,3.479c0.542,1.292,1.125,2.646,2,3.854s1.584,2.333,2.115,3.292c0.531,0.958,0.886,1.75,1.053,2.292c0.166,0.542-0.146,0.729-0.615,0.948s-1.094,0.469-1.553,1.136c-0.458,0.667-0.562,1.188-0.427,1.729c0.136,0.542,0.511,1.104,1.011,1.854s1.125,1.75,1.781,2.719s1.344,1.906,1.969,2.531s1.146,1.208,1.698,1.833c0.552,0.625,1.136,1.292,1.886,2.083s2.791,3.125,5.021,5.917c2.229,2.792,4.646,6.042,6.146,8.667s2.416,4.396,3.031,5.667c0.614,1.271,0.927,2.042,1.219,2.667s0.521,1.229,0.781,1.542c0.26,0.312,0.552,0.333,0.969-0.208s1.042-0.708,1.438-0.969c0.396-0.26,0.562-0.614,0.062-1.531s-1.229-1.688-1.729-2.261c-0.5-0.573-0.771-0.948-0.354-1.073c0.417-0.125,1.084,0.417,1.719,0.927c0.636,0.511,1.24,0.99,1.531,0.74c0.292-0.25,0.688-0.458,1.104-0.604c0.417-0.146,0.854-0.229,1.229-0.229s0.188-0.812,0.104-1.354c-0.083-0.542-0.062-0.812,0.729,0.271c0.791,1.083,0.791,1.688,0.688,2.177c-0.104,0.49-0.312,0.865,0.062,1.49s-0.479,0.729-1.24,0.865c-0.761,0.135-1.428,0.302-0.678,1.052s1.396,0.583,1.886,0.427s0.823-0.302,0.948,0.49s-0.167,1-0.417,1.229c-0.25,0.229-0.458,0.479-0.167,1.354c0.292,0.875,0.479,2,0.479,2.667c0,0.667-0.188,0.875-0.646-0.083s-0.833-1.625-1.197-2.125c-0.365-0.5-0.72-0.833-1.137-1.125c-0.416-0.292-0.791-0.417-1.125-0.385c-0.333,0.031-0.625,0.219-0.875,0.552s-0.729,0.5-0.938,0.771c-0.208,0.271-0.146,0.646,0.688,1.396c0.834,0.75,1.021,1.167,1.188,1.688c0.167,0.521,0.312,1.146,1.062,2.312s1.229,2,1.615,2.698c0.386,0.698,0.678,1.26,1.053,1.885s0.458,2.188,0.844,3.552c0.385,1.365,1.072,2.532,2.656,2.365c1.583-0.167,1.844-1.406,2.094-2.214c0.25-0.807,0.489-1.182,2.031,0.38c0.219,0.223,0.062,0.402-0.076,0.577c-0.138,0.175-0.258,0.345,0.033,0.548c0.344,0.24,1.094,0.229,1.764,0.398c0.669,0.169,1.258,0.518,1.279,1.477c0,0,0.031,0.302-0.078,0.656s-0.359,0.76-0.922,0.969s-1.146,0.135-1.589,0.099s-0.745-0.037-0.745,0.318s0.083,0.812,0.052,1.141s-0.177,0.526-0.636,0.359c-0.458-0.167-0.406-0.542-0.333-0.927c0.073-0.386,0.167-0.781-0.208-0.99s-0.344-0.636-0.339-1.011S175.646,81,175.166,81c-0.479,0-1.207,0.135-1.723,0.427c-0.516,0.292-0.818,0.74-0.443,1.365s0.947,1.729,1.516,2.948c0.567,1.219,1.13,2.552,1.484,3.636c0.291,0.89,0.666,1.947,1.07,3.069s0.838,2.31,1.247,3.458c1.65-2.489,4.645-3.875,7.575-4.809C188.822,90.161,191.688,89.68,193.083,89z',
					'chefs' : [
						["Molten Restaurant","Robert","Richardson","Head Chef","422 Mt Eden Road","Mt Eden","Auckland","09 638 7236","Slow roasted Silere Lamb Rump","Main","Silere Lamb Rump","Spring Lamb with Seasonal Vegetables. Garlic and salted lamb rump, pan-seared and roasted pink served with egg plant puree, peas, fior di laffe and white anchovy"],
						["The Food Store","Sunil","Kassote","Sous Chef","95-97 Market Square","Vaiduct Harbour","Auckland","021 882 2985","","","Eye Fillet",""],
						["No 1 High Street","Ramaiyah (James) ","Balakrishnan","Head Chef","Corner of High st and shortland st","CBD","Auckland","021 022 27810","Silver Fern Lamb with Asian Flavour","Main","Lamb Eye ","Silver Fern grass fed lamb eye, masala yoghurt salsa, jasmine rice salad"],
						["Annabelle's","Susan ","Cho","Owner","409 Tamaki Drive","St Heliers","Auckland","09 575 5239","Eye Fillet of Beef","Main","Eye Fillet","Eye fillet with mustard mash potato, spinach balsamic roast tomato and thyme jus"],
						["Vinnies","Andrew","Hanson","Head Chef","166 Jervois Road","Herne Bay","Auckland","09 360 4340","Silvere Alpine Merino","Main","Loin Fillet","Silere Alpine origin Merino, goats cheese gnocchi, beetroot, young fennel, lamb and pernod juices. The inspiration was to create a dish that complimented the lamb without over powering it, to allow the sweetness of the lamb to shine through and do something interesting with a secondary cut (Lamb Flap)"],
						["Mudbrick Winery","Mathias","Schmitt","Head Chef","Church Bay Road","Waiheke 1091","Auckland","93729050","Alpine Origin Merino","Main","Silere Rump","Alpine Origin Merino Lamb Rump, BBQ, Sage, Chilli, Ale, (BBQ suace marinated rump then grilled on the BBQ , Banana / Potatoe Moussillinni something and patotoe struesel, crispy sage, pickled chillies)"],
						["O'Connel St Bistro","Alex","Strobach","Head Chef","3 O'Connell St","Auckland ","Auckland","93771884","Silver Fern Farms Venison Loin with crème fraiche spatzle","Main","Venison Loin","Silver Fern Farms Venison Loin Crème Fraiche Spatzle sauteed rainbow chard, mushrooms and green peppercorn jus.  Inspiration head chef German born and hunter, intergrated this into the dish"],
						["La Fourchette","Sophie","Phipps","Exec Chef","8 Turua Street","St Heliers","Auckland","09 215 8332","Cote de Bueuf for 1/2","Main","OP Rib eye 450g or 700g",""],
						["Vue Restaurant","Sharyn","Gratton","Exec Chef","8 Customs Street","Mercure Auckland","Auckland","09 302 9412","Silere Lamb rack","Main","Lamb Rack","Silere Lamb rack. Pomme puree, glazed baby carrots, blueberry beurre range. Inspiration comes from keeping the lamb rack simple and fresh and adding an innovative sauce"],
						["TOTO","Sergio","Maglione","Chef /Owner","53 Nelson Street","CBD","Auckland","09 302 2665","Tagliatelle","Main","Rump","Marinated merino lamb rump tagliatelle, oven roasted summer eggplant, semi dry tomato"],
						["Poderi Crisci","Antonio","Crisci","Owner","205 Awaawaroa Road","Awaawaroa Bay","Waiheke Island","09 379 0400","Medaglione Di Cervo marinato alla sapa con vulcano di polenta e verdurine di stagione","","Venison leg","Medallions of SFF venison. Leg marinated in spiced poderi crisci 'sapa' with polenta volcano, pan juice braised garden vegetables matched with poderi crisci virburno 2009"],
						["a Deco","Brenton ","Low","Chef/Owner","70 Kamo Road","Kensington","Whangarei ","09 459 4957","Venison 'Chop'","Main","Venison rack, venison Osso bucco","Oven roast SFF venison chop with creamed cauliflower cheese, slow-cooked osso bucco 'pie' BBQ asparagus, carrot and current salad. Inspired by kiwi classics done in an unusual and different way"]
					]
				}, // end of upper-north obj
				{
					'region' : 'center-north',
					'path' : 'M246.625,143c0.646,0.396,1,1.385,1.312,2.281s0.583,1.698,1.062,1.719s0.959,0.219,1.381,0.188s0.786-0.292,1.036-1.188s-0.104-1.802-0.474-2.724c-0.37-0.922-0.756-1.859-0.568-2.818c0.088-0.451,0.301-1.118,0.524-1.907c0.224-0.79,0.458-1.7,0.589-2.637s0.135-2.155,0.235-3.139c0.102-0.984,0.3-1.734,0.818-1.734c0.979,0,1.75,0.188,2.521,0.052c0.771-0.135,1.542-0.594,2.521-1.885c0.979-1.292,1.916-2.761,2.708-4.505c0.791-1.745,1.437-3.766,1.833-6.162s0.292-3.823,0.271-5.073c-0.021-1.25,0.041-2.323,0.771-4.01s1.791-3.229,2.588-4.615s1.328-2.615,0.995-3.677s-1.322-1.646-2.474-2.073s-2.464-0.698-3.442-1.135c-0.979-0.438-2.104-1-3.406-1.125c-1.303-0.125-2.781,0.188-4.469,1.5s-3.417,2.646-4.906,3.859c-1.49,1.213-2.74,2.307-3.469,3.141c-0.729,0.833-1.625,1.708-2.625,2.448s-2.104,1.344-3.25,1.635c-1.146,0.292-3.104-0.229-5.292-0.953s-4.604-1.651-6.667-2.172s-4.969-2.125-7.802-3.88s-5.594-3.662-7.364-4.787c-1.771-1.125-2.137-1.719-2.204-2.088s0.162-0.515-0.421-0.745c-0.584-0.229-1.355-0.031-1.938-0.109s-0.979-0.432-0.812-1.766c0.166-1.333,0.041-1.979-0.193-2.604s-0.578-1.229-0.85-2.479c-0.271-1.25-0.188-2.042-0.135-2.974c0.052-0.932,0.072-2.005-0.323-3.818s-0.375-3.032-0.354-3.975c0.021-0.942,0.042-1.609-0.354-2.317s-0.822-0.938-1.125-1.255c-0.303-0.318-0.479-0.724-0.375-1.787s-0.854-1.375-1.906-1.667c-1.053-0.292-2.198-0.562-2.469-1.542s-0.646-1.969-1.104-2.823c-0.459-0.854-1.001-1.573-1.605-2.01c-0.604-0.438-1.691-1.042-2.633-1.15c-0.941-0.108-1.736,0.28-1.752,1.827s0.398,1.828,0.852,1.879s0.945-0.129,1.086,0.496s-0.133,0.891-0.297,1.199s-0.219,0.66,0.359,1.457s0.836,1.484,0.926,2.145s0.012,1.293-0.082,1.98s-0.281,1.336-0.348,1.938s-0.012,1.156,0.379,1.656s0.781,1.062,1.117,1.684s0.617,1.301,0.789,2.035c0.079,0.337,0.136,0.639,0.169,0.913c0.034,0.273,0.046,0.519,0.034,0.743c-0.004,0.672-0.068,1.979-0.467,3.282s-1.13,2.599-2.466,3.25c-1.395,0.68-4.261,1.161-7.19,2.094c-2.931,0.934-5.925,2.319-7.575,4.809c0.089,0.25,0.177,0.499,0.264,0.745c0.086,0.246,0.171,0.489,0.253,0.728c0.458,1.333,0.625,2.906,0.63,4.422s-0.151,2.974-0.339,4.078s-0.677,2.802-1.182,4.505c-0.506,1.703-1.026,3.412-1.276,4.537c-0.238,1.071-0.654,2.448-1.102,4.101s-0.926,3.58-1.288,5.753c2.166-0.384,4.25-0.521,6.56-0.118c2.311,0.403,4.846,1.348,7.913,3.127c5.792,3.36,11.084,3.373,16.562,3.182s11.146-0.587,17.688,1.955c4.977,1.934,8.637,3.361,11.263,4.724c2.625,1.362,4.216,2.658,5.055,4.327c1.735-0.181,3.329-0.066,4.605,0.167C245.199,142.366,246.159,142.715,246.625,143z',
					'chefs' : [
						["Pumice Bistro","Carl","Houben","Head Chef","62 Church Road","","Hamilton ","021 265 7257","Taste of Beef","Main","Eye Fillet reserve/ short rib","SFF reserve eye fillet soy and beer braised short rib potato chorros and micro rocket"],
						["Agenda Restaurant","Joshua","Kanara-Bailey","Head Chef","145 Victoria Street","Hamilton Central","Hamilton","07 929 2332","Spiced Lamb","Main","Lamb Rump cap off","New Zealand Lamb rump, marinated in the chef's own mix of spices, with a chorizo and white bean cassoulet, seasonal vegetables and port wine jus"],
						["The Woodbox","Kane","Findlater","Head Chef","25 Angus Road","Ohaupo","Hamilton","07 823 6411 ","Taste of Beef","Main","Eye Fillet","Reserve Eye Fillet, confit beef cheek, smoked carpaccio with habanero mustard, exotic mushrooms, dauphinos and merlot jus. To combine SFF cuts and textures on one plate to give the customer diversity of the product"],
						["Bluestone Steak house","Michael","Huitema","Head Chef","186 Victoria Street",""," Hamilton","07 839 5152","Smoke Venison Loin","Main","Short Loin","Venison short loin with honey smoked cauliflower roast baby beetroot, water cress pumpkin dried blue berry's and raspberry vinegar"],
						["Peppers on the point","Craig ","Martin","Head Chef","214 Kawaha Pt Road","","Rotorua","07 348 1038","Flavours of Spring","Main","Lamb Rump + Rack","Sousvide Rump and Rack with Crispy sweetbreads, sweet peas, goats feta, artichoke & olive powder (light garlic foam)"],
						["Pavilion café/restaurant","Sjaack","Roos","Exec Chef","390 Fenton Street","Distinction Hotel","Rotorua","07 349 5200","From the Grill","Main","Sirloin and Eye Fillet",""],
						["Mills Reef Winery & Restaurant","Attila ","Kovacs","Exec Chef","143 Moffat Road","Bethlehem","Tauranga","022 177 4426","Lamb Loin Wellington","Main","Lamb Short Loin","Silver Fern Farms lamb loin Wellington, pokcini deluxe, honey roasted yellow beetroot puree, spring asparagus, potato fondant, syrah demi glaze."],
						["Phils Place","Daniel","Green","Head Chef","101 Tauranga Bridge marina","","Tauranga","07 574 4147","Reef N Beef","Main","Rib eye","Rib eye, a whole slipper lobster with a creamy garlic white wine sauce. Inspired by the NZ coast line and wide open pastures this dish showcases what NZ has to offer, great beef and great seafood"],
						["Halo Restaurant","Simon","Green","Exec Chef","Trinity Wharf Hotel","51 Dive Crescent","Tauranga ","07 577 8705","Poached Eye Fillet","Main","Reserve Eye Fillet, reserve short rib","Poached Eye Fillet with braised short rib, truffled leek and wild mushroom pie, pea puree and thyme jus labelled on menu under ","SFF Premier selection Beef' staying with traditional flavour combinations putting an up to date spin on them"]
					]
				}, // end of center-north obj
				{
					'region' : 'lower-north',
					'path' : 'M223,132.917c-6.542-2.542-12.209-2.146-17.688-1.955s-10.771,0.178-16.562-3.182c-3.067-1.779-5.603-2.724-7.913-3.127c-2.31-0.403-4.394-0.266-6.56,0.118c-0.018,0.108-0.037,0.214-0.056,0.321c-0.019,0.106-0.038,0.214-0.055,0.325c-0.354,2.333-0.771,4.531-1.308,6.344c-0.536,1.812-1.192,3.24-2.025,4.031c-0.834,0.792-2.032,1.229-3.246,1.542c-1.213,0.312-2.442,0.5-3.338,0.792s-1.375,0.677-2.042,1.219s-1.521,1.239-3.167,2.156c-1.646,0.917-3.364,1.552-4.516,2.391c-1.15,0.838-1.734,1.88-1.109,3.609s1.125,3.146,2.24,4.37c1.115,1.224,2.844,2.255,5.928,3.213c3.083,0.958,4.958,1.948,6.26,2.927s2.031,1.948,2.822,2.865c0.792,0.917,1.136,1.573,1.678,1.974c0.542,0.401,1.281,0.547,2.865,0.443c1.583-0.104,3.76,0.417,5.879,1.943c2.12,1.526,4.183,4.058,5.537,7.974s0.959,7.667-0.156,11.063c-1.115,3.396-2.948,6.438-4.469,8.938s-3.104,4.583-4.469,6.234c-1.365,1.65-2.511,2.869-3.156,3.641c-0.646,0.771-1.333,1.302-1.708,1.75c-0.375,0.447-0.438,0.812,0.167,1.25c0.604,0.438,1.218,0.521,1.843,0.677c0.626,0.155,1.261,0.385,1.907,1.114c0.646,0.729,1.364,1.469,2.083,2c0.718,0.531,1.437,0.854,2.083,0.75s0.719-0.604,0.85-1.006c0.13-0.4,0.317-0.702,1.192-0.41c0.875,0.291,1.573,0.135,2.01,0.114c0.438-0.021,0.614,0.094,0.448,0.927s0,1.802,0.312,2.688c0.312,0.885,0.771,1.688,1.188,2.188s0.969,0.885,1.725,0.953c0.755,0.067,1.713-0.183,2.942-0.953s3.864-2.854,6.755-5.604s6.037-6.167,8.287-9.604s3.385-6.083,4.484-8.281c1.099-2.198,2.161-3.948,4.266-5.595c1.234-0.966,2.167-2.359,3.017-3.846c0.851-1.486,1.618-3.065,2.524-4.404c0.638-0.942,1.242-1.328,1.952-1.978c0.711-0.65,1.527-1.564,2.59-3.564s1.667-3.906,2.119-5.672c0.453-1.766,0.755-3.391,1.214-4.828s0.99-2.25,1.219-2.817c0.229-0.568,0.156-0.891-0.594-1.349s-1.697-1.448-2.364-2.516s-1.052-2.213-0.677-2.984s1.322-2.521,2.817-4.339c1.495-1.817,3.536-3.703,6.099-4.745c0.715-0.291,1.428-0.514,2.129-0.682c0.702-0.168,1.393-0.281,2.063-0.351c-0.839-1.669-2.43-2.965-5.055-4.327C231.637,136.278,227.977,134.851,223,132.917z',
					'chefs' : [
						["Elephant Hill","Ashley ","Jones","Exec Chef","86 Clifton Road","Te Awanga","Hawkes Bay","06 872 6060","Beef Fillet","Main","Eye Fillet","Beef fillet, potato mousse, fried marrow, oyster mushrooms, garlic confit. Inspired by the wonderful flavours of SFF beef eye"],
						["Mister D","David","Griffiths","Chef","47 Tennyson Street","","Napier","027 291 6521","SFF Angus petit tender, olive oil poached, fuikake seasonal miso requette","Main","Petit Tender Angus",""],
						["Grand Central Hotel","Ashika","Mudaliar","Head Chef","42 Powderham Street","","New Plymouth","06 758 7495","Pistachio Crusted Venison","Entrée","Venison Short Loin","Pan seared Pistachio crusted venison sliced on a smoked aubergine puree, finished with caramelised scallops, red wine jus and micro green herbs"],
						["Nero","Scott","Kennedy","Chef/Owner","36 Amesbury Street","","Palmerston North","06 3540312","Vadonvon crumbed Silere Loin Fillets","Main Lunch and Dinner","Silere Loin Fillet & Slow Roast Shoulder","Vadonvon crumbed Silere Loin Fillets X a bringal infused slow cooked Silere lamb shoulder, fragrant masala sauce and spiced vegetable pakoras."],
						["Table 188 Kitchen and Bar","Ryan","Marshall","Head Chef/Owner","3 Campbell Street","","Palmerston North","06 3530076","Silere Merino Lamb loin","Main","Silere Lamb Loin and Shank","Silere Merino Lamb loin chargrilled and served rare, enhanced with an agria mash tossed through a minted pea puree and a home made Yorkshire pudding filled with a mouth watering lamb shank ragu"],
						["Bethany's Restaurant","Michael","Brill","Head Chef","32a The Square","","Palmerston North","021 159 5994","Succulent Beef Short Rib","Entrée","Short Rib ","Masterstock beef short rib with edam and bean salsa and soy pumpkin seeds. My inspiration to create this dish was simply about making the most flavoursome and succulent short rib around, I chose to Asian path with soy based masterstock"],
						["The Co-op","Andrew","Wood","Head Chef","69a Discovery Drive","Whitby","Porima","04 234 1580","Sous Vide Lamb rack","Main","French rack","Sous vide rack, served on a bed of chickpeas. Broad beans and comfit cherry tomatoes. Accompanied by a mushroom, spinach and sage stuffing and a beetroot puree. This has been inspired by European and New Zealand ingredients, put together using simple techniques of modern cuisine, resulting with this fusion dish"],
						["Waimea Restaurant","Michele ","Passarello","Head Chef/Owner","No 1 Waimea Road","","Waikanae Beach","04 293 4240","Sicilian Lamb rump","Main","Silere Merino Lamb rump, lambs brain","Silere Lamb rump, green olive crusted lambs brain, aubergine agro dolce, spicy pumpkin, black olive soil. I have been inspired by local produce, alpine NZ merino lamb and my Sicilian heritage to create a dish that uses traditional and modern techniques to maximise the flavour of the lamb"],
						["Wakefields","Richard ","Samways","Exec Chef","West plaza hotel","110 Wakefield street","Wellington","04 473 1440","Short Rib + Brisket Pattie, Café De Paris Mayo, Emmenthak, Sesame Broche Bun","Main Course","Short Rib + brisket","Wanted to know exactly what was going in the Pattie. Turning the classic 'café de Paris' flavour unto a sauce for the housemade bnache bun. The broche gives a slight sweetness that goes great with the Emmelhal and beef."],
						["Logan Brown","Shaun ","Clouston","Chef/Partner","192 Cubo Street","Te Aro","Wellington","04 801 5114","Premier Selection Beef Rump, pear braised rib, sesame leaf, barley cake and kin ch","Main","Premier Selection Beef D Rump and Ribs","I have always been inspired been inspired by the Korean Chef I have worked with over the years. I love the clean, fresh and interesting flavours in their cuisine. With the quality of the Premier Beef, the flavours and textures are amazing"],
						["Scopa Cafe Cucina","Jack","O'Donnell","Head Chef","141 Cuba Street","Te Aro","Wellington","027 235 6414","Seared SFF Venison","Entrée/salad","Venison Loin","The inspiration for this dish is taken from the superior quality of SFF's venison loin and how best to showcase this product in an original and interesting manner. The creaminess of whipped goats cheese serves to offset the caramalisation on the seared loin while the cheese's infusion of juniper compliments the meat's exotic qualities. The pairing of beetroot further enhances the meats earthy characteristics and the hazelnut praline and vincotto draw one's attention to the particular sweetness of SFF's venison loin while the lightly dressed spring greens offset this sweetness and bring the dish's components together to subsequently underline this product's potential"],
						["Muse on Allen","Samuel ","North","Head Chef","16-18 Allen Street","Te Aro","Wellington","021 066 3984","Boneless Lamb Rack","Main","Lamb rack","My dish will be served with young beetroots, a beetroot gel, beetroot powder, goats cheese mousse braised balsamic lentils, this dish has been inspired by taking a few simple ingredients and changing them into something attractive and tasty"],
						["One 80° Restaurant","Chetan","Pangam","Exec Chef/F&B manager","Level 7, Copthorne Hotel","Oriental Bay, 100 Oriental Parade","Wellington","04 385 0279","Duo of Silere Alpine origin Merino Lamb","Main","Lamb rump, lamb rib","Dukkah roast silere lamb rumps, braised ribs, sesame crumbed sweetbreads potenta, confit beetroot, baby carrots, lamb jus. Vibrant fresh spring inspired dish, where the lamb is the hero of the dish"],
						["Pravda Café","Adam","Rickett","Head Chef","107 Custom House Quay","","Wellington","04 801 8858","Beef Tataki with Pickled enoki","Entrée","Sirloin","Seared beef tataki with white soy ponzu, pickled evoke and toasted grains. To truly showcase the quality and flavour of the beef I wanted to present it in its purest form, for me this is raw. I have drawn from recent travels around Europe and Japan to create a balanced dish with the SFF product at the centre"],
						["Foxglove","Joshua","Dodd","Head Chef","33 Queens Wharf","","Wellington","027 431 5900","Venison tartar","","Venison denver leg","Venison tartar, horseradish, potato, wood sorel and juniper. Inspiration comes from local foraged wood sorel and the change of the seasons"]
					]
				}, // end of lower-north obj
				{
					'region' : 'upper-south',
					'path' : 'M166.562,202.5c0.578-0.109,0.992-0.188,1.25-0.379s0.359-0.496,0.312-1.059s-0.039-1.367-0.125-2.047s-0.266-1.234-0.688-1.297s-0.734-0.008-1.043-0.016s-0.613-0.078-1.02-0.391s-0.859-1.031-1.285-1.598s-0.824-0.98-1.121-0.684s-0.219,0.797-0.273,1.137s-0.242,0.52-1.07,0.176s-1.289-0.547-1.496-0.781s-0.16-0.5,0.027-0.969s0.211-0.773,0.102-1.043s-0.352-0.504-0.695-0.832s-0.539-0.57-0.68-0.891s-0.227-0.719-0.352-1.359s-0.273-1.18-0.48-1.559s-0.473-0.598-0.832-0.598s-0.5,0.234-0.676,0.523s-0.387,0.633-0.887,0.852s-0.805,0.328-1.004,0.559s-0.293,0.582-0.371,1.285s-0.008,1.336-0.016,1.961s-0.094,1.242-0.484,1.914s-0.781,1.32-1.172,1.836s-0.781,0.898-1.172,1.039s-0.93,0.461-1.625,0.902s-1.547,1.004-2.562,1.629c0,0-0.594,0.328-1.328,0.828s-1.609,1.172-2.172,1.859s-0.984,1.273-1.473,1.648s-1.043,0.539-1.871,0.383s-1.023-0.43-1.168-0.836s-0.238-0.945-0.863-1.633s-0.82-1.641-0.824-2.617s0.184-1.977,0.324-2.758s0.477-1.547,0.723-2.305s0.402-1.508,0.184-2.258s-0.461-1.336-0.785-1.73s-0.73-0.598-1.277-0.582s-1.359,0.031-2.199-0.09s-1.707-0.379-2.363-0.91s-1.312-0.883-1.738-1.273s-0.621-0.82-0.355-1.508s0.688-0.984,1.062-1.309s0.703-0.676,0.781-1.473s-0.008-1.352-0.238-1.75s-0.605-0.641-1.105-0.812s-1.117-0.281-1.605-0.23s-0.848,0.262-0.832,0.73s0.023,0.734-0.074,0.91s-0.301,0.262-0.707,0.371s-0.68,0.344-0.902,0.625s-0.395,0.609-0.598,0.906s-0.742,0.414-1.254,0.566s-0.996,0.34-1.09,0.777s-0.219,0.883-0.418,1.25s-0.473,0.656-0.863,0.781s-1.266,0.531-2.195,1.316s-1.914,1.949-2.523,3.59s-0.711,4.094-0.73,6.523s0.043,4.836-0.238,6.383s-0.805,3.242-1.613,4.914s-1.902,3.32-3.324,4.773s-3.195,2.023-4.695,2.402s-2.727,0.566-3.055,1.254s-0.523,1.875-0.805,3.254s-0.648,2.949-1.32,4.402s-1.148,3.008-1.523,4.574s-0.648,3.145-0.914,4.645s-1.148,3.164-2.148,4.906s-2.117,3.562-2.852,5.375s-1.188,3.086-2.074,4.379s-2.207,2.605-4.676,4.496s-4.453,2.578-6.434,3.625s-3.957,2.453-6.41,5.781c-1.591,2.158-3.276,4.014-4.916,5.628s-3.234,2.989-4.644,4.186c5.129,1.804,12.068,1.335,19.067,0.803c6.999-0.533,14.059-1.13,19.43,0.415c3.135,0.902,5.627,2.545,7.6,4.487s3.427,4.184,4.485,6.283c1.458-1.009,2.86-1.854,4.183-2.539c1.323-0.686,2.565-1.21,3.702-1.575c1.312-0.422,2.445-0.961,3.59-1.348s2.301-0.621,3.66-0.434s2.141,0.859,2.758,1.465s1.07,1.145,1.773,1.066s1.383,0.391,1.902,0.637s0.879,0.27,0.941-0.699s0.195-1.406,0.461-1.527s0.664,0.074,1.258,0.371s0.766-0.148,0.73-0.781s-0.277-1.453-0.512-1.906s-0.234-0.898-0.301-1.316s-0.199-0.809-0.699-1.152s-1.055-1.203-1.562-1.809s-0.969-0.957-1.281-0.285s-0.477,0.82-0.684,0.746s-0.457-0.371-0.941-0.59s-0.789-0.617-1-1.105s-0.328-1.066-0.438-1.645s-0.844-1.328-1.242-2.625s-0.461-3.141,0.773-5.906s1.734-3.711,2.223-4.059s0.965-0.098,2.152-0.473s2.641-1.195,4.051-2.402s2.777-2.801,3.793-4.723s1.82-3.742,2.57-5.438s1.445-3.266,2.242-4.688s1.656-1.57,2.363-1.742s1.262-0.367,1.449-1.883s0.758-2.633,1.516-3.699s1.703-2.082,2.641-3.395s1.477-2.742,2.242-4.195s1.758-2.93,3.602-4.336s2.32-2.367,2.266-3.102s-0.641-1.242-0.922-1.742s-0.883-1.266-1.406-2.082s-0.969-1.684-0.938-2.387s-0.438-1.508-0.793-2.383s-0.598-1.82-0.113-2.805s1.336-0.781,2.043-0.617s1.27,0.289,1.176-0.852s0.5-1.469,1.043-1.652s1.035-0.223,0.738-0.785s-0.594-0.977-0.672-1.277S165.984,202.609,166.562,202.5z',
					'chefs' : [
						["Chillingworth Road","Darren","Wright","Exec Chef","478 Cranford Street","Papanui","Christchurch ","03 352 7784","Silere Merino Lamb","Main","Silere Merino Lamb Loin and Sweetbreads","Silere Merino Lamb Loin, Lamb Sweetbreads. Pecorino Tart, Bolotti Beans, Asparagus and Peas. Lamb jus"],
						["Saggio Di Vino","Sebastian ","Koburg","Head Chef","179 Victoria Street","","Christchurch ","03 379 4006","Sweet and Sour Lamb","Main","Merino Lamb French Rack","Grilled roasted merino lamb French rack with sweet and sour kumara, sage and radicchio"],
						["Curators House","William","Sands","Exec Chef","7 Rolleston Avenue","Botanic Gardens","Christchurch ","03 378 2252","New Zealand Cervena","Main","Denver Leg","Denver Leg served atop braised red cabbage, pomme dauphine and a juniper berry reduction. Grew up in gastro pub all my life and is one of the most versatile proteins you can use. Served with traditional accompaniments with little twists here and there to champion the venison as the hero"],
						["Pescatore","Reon","Hobson","Chef de cuisine","50 Park Terrace","","Christchurch","03 371 0257","Silere Lamb - Brown butter poached","Main","Boneless Loin","Canterbury's close association with the Alpine Ranges makes Silere Merino an obvious choice. I have chosen a smokey element and nutty rich butter flavours to compliment the rich robust flavours of the merino. The onion element offers a stronger savoury note and supports with a textural variance included with the tempura onion ring. The parsley compliments the dish with herbvous flavour and vibrant colour"],
						["Hopgood's Restaurant","Aaron","Ballantyne","Head Chef","284 Trafalgar Street","","Nelson","03 545 7191","Silver Fern Farms lamb rump & slow cooked shoulder, faro beans, smoked aubergine, broad beans & yogurt","Main","Lamb rump (cap on) and Half Oyster Shoulder","I wanted to showcase two of my favourite cuts of lamb in a nice light spring/summer dish. Lamb rump is slow cooked sous vide, rolled in herbs, seared crispy and sliced. Shoulder is braised at low temperature overnight. Then pressed and heated in a light lamb jus. The dish is served with a fried faro cake, smoked aubergine puree, roast beets and a light broad bean salad with salsa dressed with local sheep's yogurt, olive oil and herbs"],
						["Mint Dining Room","Grant","Dicker","Owner/Chef","20 Harley Street","","Nelson","03 546 7092","Trio of Silere Merino Lamb","Main","Oyster shoulder and 'cap on' rump","Slow cooked silere merino lamb shoulder served two ways, roasted rump, creamed leeks and provencale flavours. Fresh seasonal flavours and classic techniques to bring out the best in the Alpine raised lamb."],
						["Theatre Royal Hotel","Alex","Ensor","Exec Chef","81 Seddon Street","Kumara","West Coast","03 736 9277","Venison 3 ways with truffle","Main","Boneless short loin","Silver fern venison short loin, truffled... parsnip puree, baby turnips, watercress petels, venison marrow jus. Inspired by growing up on the coast and hunting deer combined with cooking styles learned abroad"],
						["Station's Inn","Drew","Boyling","Head Chef","Blue Spur Road","","Hokitika","03 755 5499","Silver Fern venison fillet, pepper crusted with crumbed brie and blueberry chutney","Main","Loin Fillet","200g portion of venison loin fillet rolled in a mixed pepper crust and pan seared to medium rare. Well rested and sliced with homemade blueberry chutney and crumbed brie. Nice and simple complimenting flavours acts as a sauce component"],
						["Millie's Café","Ang","Williams","Owner","35 Weld Street","","Hokitika","027 238 5710","Springtime","Lunch","Shoulder, tongue, livers","I have tried to capture and showcase spring and also the west coast. Using different techniques, spring flowers, pikopiko powder and the fern, local beer this is a stunning dish"],
						["The Tea House","Heath","Bashford","Head Chef","6 Robert Street","","Lincoln","03 325 7242","Herb crusted venison rack","Main","French rack of Venison","Thyme and mustard crusted French rack of Venison served with a Tamarilo Tortellini, slow roasted tomatoes and shallots with a Pinot Noir reduction"]
					]
				}, // end of upper-south obj
				{
					'region' : 'lower-south',
					'path' : 'M42.5,380.281c-0.109,0.719-0.711,1.25-1.398,1.656s-1.461,0.688-1.914,0.906s-1.359,0.438-2.273,0.75s-1.836,0.719-2.32,1.312s-1.039,0.898-1.773,1.223s-1.648,0.668-2.852,1.34s-1.945,0.68-2.484,0.363s-0.875-0.957-1.266-1.582s-0.359-1.047-0.152-1.34s0.59-0.457,0.902-0.566s0.516-0.711,0.707-1.406s0.371-1.484,0.637-1.969s0.93-1.344,1.57-2.246s1.258-1.848,1.43-2.504s-0.039-1.609-0.277-2.527s-0.504-1.801-0.441-2.316s0.406-1.117,1.023-1.562s1.508-0.734,2.664-0.625s1.75,0.641,2.191,1.348s0.73,1.59,1.277,2.402s0.953,1.484,1.309,2.031s0.66,0.969,1.004,1.281s1.008,0.961,1.559,1.711S42.609,379.562,42.5,380.281z M103.5,276c-5.372-1.545-12.431-0.948-19.43-0.415c-6.999,0.532-13.938,1.001-19.067-0.803c-0.764,0.647-1.474,1.245-2.107,1.799c-0.633,0.555-1.189,1.066-1.646,1.544c-1.297,1.359-2.664,2.391-4.395,3.598s-3.824,2.59-6.574,4.652s-5.133,2.508-7.168,2.742s-3.723,0.258-5.082,1.477s-2.555,3.211-3.648,5.172s-2.086,3.891-3.039,4.984s-2.031,2.414-2.871,3.562s-1.441,2.125-1.441,2.531s-0.547,0.945-1.203,1.488s-1.422,1.09-1.859,1.512s-1.297,1.633-2.387,3.008s-2.41,2.914-3.77,3.992s-2.766,2.531-4.039,4.098s-2.414,3.246-3.242,4.777s-1.805,3.688-2.645,5.66s-1.543,3.762-1.824,4.559s0.094,1.68,0.32,2.371s0.305,1.191-0.57,1.223s-1.57,0.234-2.098,0.539s-0.887,0.711-1.09,1.148s-0.547,0.969-0.805,1.488s-0.43,1.027-0.289,1.418s0.617,0.742,0.984,1.051s0.625,0.574,0.328,0.793s-0.586,0.453-0.781,0.789s-0.297,0.773-0.219,1.398s0.18,1.422,0.398,2.078s0.555,1.172,1.102,1.234s1.039,0.055,1.449,0.16s0.738,0.324,0.957,0.84s0.68,2.086,1.207,3.488s1.121,2.637,1.605,2.48s0.664-0.883,0.812-1.484s0.266-1.078,0.625-0.734s1.008,0.844,1.738,1.246s1.543,0.707,2.23,0.66s0.977-0.5,1.25-0.895s0.531-0.73,1.156-0.543s1.672,0.656,2.652,1.02s1.895,0.621,2.254,0.387s0.289-0.945,0.215-1.617s-0.152-1.305,0.191-1.383s0.727,0.117,1.105,0.336s0.754,0.461,1.082,0.477s1.25,0.195,2.188,0.484s1.891,0.688,2.281,1.141s0.445,1.117,0.582,1.781s0.355,1.328,1.074,1.781s1.422,0.43,2.059,0.25s1.207-0.516,1.66-0.688s1.016-0.086,1.566,0.039s1.09,0.289,1.496,0.273s0.82-0.43,1.258-0.75s0.898-0.547,1.398-0.188s0.695,1.133,0.832,1.922s0.215,1.594,0.48,2.016s0.586,0.312,0.953,0.277s0.781,0.004,1.234,0.723s0.797,0.984,1.133,1.059s0.664-0.043,1.086-0.09s1.008,0.312,1.586,0.617s1.148,0.555,1.539,0.289s0.75-0.742,1.129-1.125s0.777-0.672,1.246-0.562s1.211,0.305,1.82,0.523s1.086,0.461,1.023,0.664s-0.32,0.594-0.453,1.016s-0.141,0.875,0.297,1.203s1.164,0.172,1.98-0.109s1.723-0.688,2.52-0.859s2.344-0.133,3.957-0.375s3.293-0.766,4.355-2.062s2.695-2.641,4.391-4.078s3.453-2.969,4.766-4.641s2.648-3.117,3.859-4.453s2.297-2.562,3.109-3.797s1.359-2.109,2.145-2.707s1.809-0.918,3.574-1.043s2.781-0.609,3.152-1.293s0.098-1.566-0.715-2.488s-1.625-1.695-1.926-2.223s-0.09-0.809,1.145-0.746s1.258-0.266,1.211-1.027s-0.164-1.957,0.789-3.629s1.422-3.336,1.879-5.066s0.902-3.527,1.809-5.465s1.844-3.352,2.621-4.805s1.395-2.945,1.66-5.039s0.164-4.125,0.117-5.969s-0.039-3.5,0.445-4.844s0.867-3.109,1.508-4.73s1.539-3.098,3.055-3.863s3.023-1.5,4.582-2.363s3.168-1.855,4.887-3.137c0.23-0.172,0.459-0.338,0.687-0.502c0.228-0.162,0.454-0.322,0.679-0.478c-1.058-2.1-2.512-4.341-4.485-6.283S106.635,276.902,103.5,276z',
					'chefs' : [
						["The Millhouse","Andi","Bozhiqi","Exec Chef","Mallaghans Road","Private bag 50078","Arrowtown","021 908 905","Silver Fern Farms Venison","Main","Loin and Shank","Silver Fern Farms Venison. Southland venison loin, open venison steak sandwich, beetroot, pickled red cabbage, yoghurt snowballs"],
						["Wild Earth","David","Harrison","Head Chef","803 Kawarua Gorge Road","Cromwell","Central Otago","021 100 3906","Twice Barrel Cooked Lamb Rump","Tasting","Lamb rump","Lamb rump marinated in Wild Earth Pinot and wild thyme. Cooked twice in our Pinot Barrel cookers served over spiced quinoa, caponata and gremolata cheese disc. Our Menu focuses on wild sophistication. Using local produce cooked in wild earth barrel cookers matched expertly to our wines. We like to promote the whole experience of food and wine matching. We break down the flavours in each vintage of wine and create dish's to match. This dish was created to match the Wild Earth Pinot Noir 2010. The bold flavours showing through in this hot vintage are offset by the spice, while the ripe fruit flavours compliment the depth of flavour in the rump"],
						["The Kensington","James","Blair","Head Chef","4 King Edwards Street","South Dunedin","Dunedin","021 179 6337","Lamb Rump","Main","Lamb rump","A reflection of traditional kiwi lamb-rasted medium rare with balsamic glazed baby vegetables, potato rosti and rich rosemary red wine jus - simple and superb done well"],
						["Salt","Callan","Lloyd","Head Chef","240 Forbury Street","St Clair","Dunedin","03 455 1077","Beef Fillet","Main","Fillet tenderloin of beef","Beef fillet served on a creamy potato gratin with a marinated Portobello mushroom, wilted greens and finished with a green peppercorn jus"],
						["Luna Bar and Restaurant","Karl","Toth","Head Chef/Owner","314 Highgate","Roslyn","Dunedin","027 775 98083","SFF Lamb Rump","Main","Lamb rump cap off","I wanted to put a lamb dish on the menu for the new season that was lighter than the winter shank and add some Moroccan flavours without overpowering the lamb"],
						["Robbie's Bar and Bistro","George","Melrose","Head Chef","Corner of MacAndrew road and King Edward Street","","Dunedin","03 455 2802","Pacific Bowl","Main","Beef Fillet","My Beef Fillet wife, fillet steak on seina, pakora vegetables, raita, tamarind, nasturtiun garnisa"],
						["Two Chefs Bistro","Helen","Manson","Chef/Owner","121 Stuart Street","","Dunedin","03 477 7293","Smoked Silere Merino cutlet","Main","Silere Merino rack and Lamb rump","Dish was inspired by the purchase of a digitally controlled smoker and the discovery of silere merino being a meat with enough fat content to stay beautifully tender after smoking, then matched with flavours of morocco. Description: Smoked silere merino cutlet and roasted lamb rump, baked harissa eggplant, pomegranate jewels, potato and feta fritters"],
						["Bacchus","Rosalie","Lock","Head Chef","12 The Octagon","","Dunedin","03 474 0824","Oven Baked Lamb Rump","Main","Lamb Rump","SFF Lamb Rump, oven baked with a mint pesto crust on a Mediterranean salad with caponata and jus"],
						["Delicacy","Alison","Lambert","Chef/Owner","Highgate","Maori Hill ","Dunedin","03 464 0700","Morrocan spiced venison,","Warm Salad","Venison loin","Seasonal, local produce with a hint of morocco. Morrocan spiced venison, whole wheat, roasted beetroot and wild rocket salad with pommegranite and...."],
						["Coast Restaurant","Richard ","Collins","Chef","Beach Road","","Kakanui","03 439 5969","Beef reserve","Main","Rib eye/ scotch","Fbeef reserve/ scotch fillet cooked to order with seasonal vegetables, potato rosti and housemade garlic chilli butter"],
						["Northstar Restaurant","Pablo","Tacchini","Head Chef","495A Thames Highway","","Oamaru","027 415 1274","Pan seared Lamb Rump","Main","Silere Lamb Rump","Pan seared lamb rump with cous cous salad, grilled asparagus and minted cuolla sauce. Argentinian cuisine"],
						["Hillarys","Shinji","Kurihara","Sous Chef","88 Frankton Road","","Queenstown","021 042 4463","Beef Katsuwith sesame milo sauce","Main"," ","Beef cotelette (crumbed Beef Japanese style) Sesame and miso sauce, served with potato and broad bean salad"],
						["Bunker","Liam","Deasy","Head Chef","Cow Lane","","Queenstown","03 441 8030","Reserve Rib eye and short Rib","Main","Rib eye and Short Rib","Classic Beef compliments with a refined twist. Roasted SFF reserve rib eye, slow braised short rib with a bone marrow gratin, smoked tomato mousse, fried onion puree and wild mushrooms two ways"],
						["Impressions, Copthorne Lakefront","Jonny","Coulter","Head Chef","Copthorne Hotel and Resort Lakefront","Corner Frankton and Adelaide Roads","Queenstown","03 450 0260","NZ Spring Lamb","Main","Lamb Rump","Pistachio crusted lamb rump served with manuka smoked kumara mash, baby spring vegetables drizzled with a rosemary jusette. Inspiration is 'Spring Time'"],
						["Gantleys ","Craig ","Hendry","Head Chef","172 Arthurs point road ","","Queenstown","03 442 8999","Hereford Beef Fillet with braised beef rib","Main","Fillet and Rib","Braised beef rib and beef fillet, blue cheese beinget , pan jus and seasonal vegetables"],
						["Lombardi restaurant at St Moritz Hotel","Emiliano","Comerso","Sous Chef","10-18 Brunswick Street","","Queenstown","03 442 4990","Lamb","Main","Lamb whole Leg ","We wanted to give full flavour of lamb, to have the whole experience so we have been researching all the different cuts of the animal, from nose to tail, and the different cooking methods, and after a long research, we came up with this dish, it's a mix of NZ tradition and New World memories"],
						["Lombardi restaurant at St Moritz Hotel","Martin","Zaiden","Chef de partie","10-18 Brunswick Street","","Queenstown","03 442 4990","Otago Beef Fillet","Main","Beef Fillet","We are located in Otago region, the soil here has the same sweet flavours (that can be reflected in the great pinot noir and Riesling from this region) the grass that the animal eats has the same sweet flavours, because of that we came up with this dish"],
						["Wakahipu Grill","Frederic","Monnies","Exec Chef","Hilton Queenstown","79 Peninsula road","Queenstown","03 450 9438","Silere Merino Lamb shoulder, slow cooked, minted pea puree, vintage goats feta, baby carrots and potato","Main","Silere Merino Lamb oyster shoulder","Inspiration came as taking the idea of roast lamb, and turn it into something more modern"],
						["Observatory at Millennium","Sally","King","Junior sous chef","32 Frankton Road","PO Box 551","Queenstown","03 422 3418","Lamb Shank Wellington","Main","Lamb Shank","Slow braised and de-boned lamb shank, encased in rosemary infused mushroom duxelle and crisp puff pastry. Served with roasted kumara and pumpkin puree and seasonal greens"],
						["Amisfield","Jay ","Sherwood","Chef","10 Lake Hayes Road","RD1","Queenstown","021 302 937","Grilled Beef Rump, charred cauliflower, pickled onion, chimmichur and oregano","Main","Beef Rump","I was inspired by spring. I wanted to use rump because of the amazing flavour. The grilled flavour of the meat pairs with charred flavour of the cauliflower and onion and the chimmichurr brings it all together with the strong flavour of fresh herbs"],
						["Panarama restaurant","Kane","Bambery","Exec Chef","89 Terrace road","Aoraki/Mt Cook","South Canterbury","027 334 5175","Times have changed","Entrée","Silere Lamb Loin ","Inspiration comes from the change in seasons and nature it self. Description - young and tender"],
						["Starfish","Keri/Levi","","Chef","7/240 Forbury Road","","St Clair, Dunedin","021 242 4330","Horopito rubbed Alpine Merino","Entrée/Salad","Alpine Merino Lamb rump","Horopito rubbed lamb rump seared and baked to medium rare served on a roasted beetroot charred green bean and toasted almond salad topped in creamy feta and berry vinegarette"],
						["Pier 24","Greg","Piner","Head Chef","Hotel St Clair","24 The Esplanade","St Clair, Dunedin","027 436 6835","Grilled Venison Loin","Main","Venison Loin","Chargrilled venison loin, green pepper corn and sage pesto, leek and black pudding tart, glazed beetroot, blood orange jus"],
						["Mckinnon Room Restaurant","Ken","O'Connell","Group Executive Chef","Distinction Hotel and Villas","64 Lakefront Drive","Te Anau ","03 2499 700","Fillet of Venison","Main","Venison Fillet + Cheek","Fillet of venison, braised cheek and venison ham croquette, juniper poached pear celeriac and baby carrots, potato puree in brick pastry and a venison jus"]
					]
				} // end of lower-south obj
			] // end of dat obj
		}, // end of setting obj

		svgTest : function(){

			if (Modernizr.svg){ // check with Modernizer if the current broswer supports SVG (if yes then we can animate with TweenMax for all map interactivity)

				return true;

			}else{

				return false;

			} // end of if statement

		}, // end of svgTest fnc

		ltIe9 : function(){

			var $ltIe9 = $('html').hasClass('lt-ie9');

			console.log('$ltIe9 = ' + $ltIe9);

			return $ltIe9;

		}, // end of ltIe9 fnc

		touchTest : function(){

			$m.s.touch = false; // will be updated to true when the <body> registers a touch action...

			$('body')
				.on('touchstart', function(){ // if the body is effected by a touch then do not execute the dynamic mouse scrolling from the 'mousemove' function on the $chfCon...

					$m.s.touch = true; // ...instead change the dynamic scroll boolean to false...

					$(this)
						.find('.scroll-container')
						.css({'overflow-x' : 'scroll'}); // ...and set the scroll container to scroll in the x-axis so that the content can be panned with a finger and clicking on a li will not jump the ul to the dynamic scroll location

				});

		}, // end of touchTest fnc

		regions : {

			init : function(){

				var $r    = new Raphael('paper', 500, 500), // initializes Raphael on the #paper DOM element
					$len  = $m.s.dat.length, // find out how many regions there are in the data array
					$attr = { // set the generic attributes that the Raphael svg / vml shapes will take on
						'fill' : 'gray',
						'stroke' : 'none',
						'opacity' : '0' // hide shape as it will be used as for hit detaction only - a raster 'sketch' version of the map will be used as the aesthetic...
					},
					$mc = $('.map-container'), // reference the map container DOM element...
					$rm = $mc.find('.region-map'), // from the above DOM reference find the region map -> this will be used to select all map shapes / the active shape and the over shape...
					$rl = $mc.find('.region-list'), // from the above DOM reference find the region list -> this will be used to select all li / the active li and the over li...
					$ani = $m.s.ani,
					$i, $path, $map, $li, $lnd; // nulls that will be filled in later

				for($i = 0; $i < $len; $i++){ // loop though each of the map regions...

					$path = $m.s.dat[$i].path; // fetch path data from stored data inside the setting obj

					$map = $r.path($path).attr($attr); // add the path data to the Raphael obj
					$li = $rl.find($('li[data-num="' + $i + '"]')); // find the current list item
					$lnd = $rm.find('.land-mass').find($('li[data-num="' + $i + '"]')); // find the current land mass

					// run the listeners for the map and list element for the region in the current loop state
					$m.regions.listeners.map($map, $rm, $rl, $li, $lnd, $i, $ani); // Raphael listeners...
					$m.regions.listeners.list($rm, $rl, $li, $lnd, $i, $ani); // jQuery listeners...

				} // end of for loop

			}, // end of init fnc

			listeners : {

				map : function($map, $rm, $rl, $li, $lnd, $i, $ani){

					$map.node.onclick = function(){ // set the Raphael on click event...

						$m.regions.actions.onclick($i);

					};

					$map.node.onmouseover = function(){ // set the Raphael on mouseover event...

						$m.regions.actions.onmouseenter($rm, $rl, $li, $i, $lnd, $ani);

					};

					$map.node.onmouseout = function(){ // set the Raphael on mouseout event...

						$m.regions.actions.onmouseleave($rm, $rl, $i, $lnd, $ani);

					};

				}, // end of map fnc

				list : function($rm, $rl, $li, $lnd, $i, $ani){

					$li.on('click', function(){

						$m.regions.actions.onclick($i);

					}).on('mouseenter', function(){

						$m.regions.actions.onmouseenter($rm, $rl, $li, $i, $lnd, $ani);

					}).on('mouseleave', function(){

						$m.regions.actions.onmouseleave($rm, $rl, $i, $lnd, $ani);

					});

				} // end of list fnc

			}, // end of listeners fnc

			actions : {

				onclick : function($i){

					//alert('svg = ' + $m.s.svg);
					// if ie8
						//$map.attr("fill", "red");

					// else
						// TweenMax

					//console.log('click $i = ' + $i);

					//$map.attr("fill", "red");

					//$li.css({'color' : '#000000'});

					$m.s.atvReg = $i; // set the current region reference -> used for mouseenter code below...

					$m.chefs.popData($i); // populate the chef section with data from the selected region...

					if($m.s.$ltIe9){ // change to if($m.s.$ltIe9){

						$('.chef-container')
							.find('ul')
							.attr({'data-seg' : '1'});

					} // end of if statement

				}, // end of onclick

				onmouseenter : function($rm, $rl, $li, $i, $lnd, $ani){

					// set DORMANT states...
					//TweenMax.to($rm.find('li'), $ani, {'opacity' : '0'}); // ALL land masses are faded out
					$rm.find('li').stop().animate({'opacity' : '0'}, 250); // using jQuery animate instead of the TweenMax code above as it would not work with IE8
					TweenMax.to($rl.find('li'), $ani, {'color' : $m.s.col.lytGray}); // ALL list items are faded out

					// set ENTER state...
					//TweenMax.to($lnd, $ani, {'opacity' : '1'}); // current land mass set to full opacity
					$lnd.stop().animate({'opacity' : '1'}, 250); // using jQuery animate instead of the TweenMax code above as it would not work with IE8
					TweenMax.to($li, $ani, {'color' : $m.s.col.medBrown}); // current list item set to brown

					$('body').css({'cursor' : 'pointer'}); // change the cursor to pointer (makes the land mass svg / vml elements seem un-block like)

				}, // end of onclick

				onmouseleave : function($rm, $rl, $i, $lnd, $ani){

					var $atvReg = $m.s.atvReg;
			
					// set DORMANT states...
					//TweenMax.to($lnd, $ani, {'opacity' : '0'}); // ALL land masses are faded out
					$lnd.stop().animate({'opacity' : '0'}, 250); // using jQuery animate instead of the TweenMax code above as it would not work with IE8
					TweenMax.to($rl.find('li'), $ani, {'color' : $m.s.col.medGray}); // ALL list items are faded out

					// set ACTIVE state...
					//TweenMax.to($rm.find($('li[data-num="' + $atvReg + '"]')), $ani, {'opacity' : '1'}); // active land mass set to full opacity
					$rm.find($('li[data-num="' + $atvReg + '"]')).stop().animate({'opacity' : '1'}, 250); // using jQuery animate instead of the TweenMax code above as it would not work with IE8
					TweenMax.to($rl.find($('li[data-num="' + $atvReg + '"]')), $ani, {'color' : $m.s.col.medBrown}); // active list item set to brown

					$('body').css({'cursor' : 'default'}); // change the cursor back to default

				} // end of onclick

			} // end of actions obj

		}, // end of create map fnc

		// ----------

		chefs : {

			init : function($i){

				var $chfCon = $('.chef-container');

				$m.chefs.popData($i, $chfCon);
				$m.chefs.listeners($chfCon);

			}, // end of init fnc

			popData : function($i, $chfCon){

				var $wth = 0, // the ul width that will be the exact length to hold all of the created chef li's...
					$li  = '', // shell for housing the list data
					$ani = $m.s.ani,
					$k = 0, // counter used to position the sketch sprite on the different chef entries
					$j, $dat, $regLen, $chfLen, $ran, $ul; // nulls to populate later

				
				if(isNaN($i)){ // if $i has not been defined then this is the first time that the chefs are being populated... in that regard chefs ALL regions will reside inside the ul via random population

					$ran = true;

				}else{

					$ran = false;

				} // end of if statement

				if($ran){ // if $i has not been defined then this is the first time that the chefs are being populated... in that regard chefs ALL regions will reside inside the ul
					
					$i = 0; // set $i to zero as chefs in ALL regions will be displayed
					$regLen = $m.s.dat.length; // set the region loop length to be = to the anount of regions in the data set

				}else{ // if $i has been defined then we will populate teh chefs from the used selected region... $i will = the region array reference with the loop length being $i + 1 so that it will run only once

					$chfCon = $('.chef-container'); // set the DOM reference as it will not be pulled though from the init()
					$regLen = $i + 1; // set the region loop length to run the loop only ONCE!

				} // end of if statement

				// the chef population for the ul is based on two for loops... the first one based on looping $i is for the initial load when we populate the ul with chefs from ALL regions in the ul
				// in that regard we start at zero and loop though each region set in the array
				// if there is only a single specific region set to loop though $i will = the region array reference with the loop length being $i + 1 so that it will run only once
				for($i; $i < $regLen; $i++){

					$dat = $m.s.dat[$i].chefs; // get the data from selected region

					// set non random parameters...
					$chfLen = $dat.length; // find the loop length for the entry in the current region
					$j = 0; // loop will start at the begining of the array

					if($ran){

						$j = $m.chefs.randomNum(0, ($chfLen - 2)); // loop will start at the begining of the array
						$chfLen = $j + 2;

					} // end of if statement

					//console.log('$dat = ' + $dat);

					for($j; $j < $chfLen; $j++){ // loop though the region data and populate the li...

						$li +=  '<li data-region="' + $i + '" data-chef="' + $j + '" data-sprite="' + $k + '">' + // open li element
								//'<img src="img/_temp-placeholder-.jpg" alt="' + $dat[$j][8] + '">' +
								'<div class="image" style="background-position:' + ($k * -100) + 'px 0;"></div>' +
								'<h3>' + $dat[$j][0] + '</h3>';

						if($dat[$j][8] !== ''){ // if there is A DISH NAME stipulated in the entry data...

							$li +=  '<h4>' + $dat[$j][8] + '</h4>';

						}else{ // if there is NO DISH NAME stipulated in the entry data...

							console.log('there is no dish name | num = ' + $j);

							$li +=  '<h4>' + $dat[$j][10] + '</h4>'; // then subsitute the description for the cut name

						} // end of if statement

						if($dat[$j][11] !== ''){ // if there is A DESCRIPTION stipulated in the entry data...

							$li +=  '<span>' + $dat[$j][11] + '</span>';

						}else{ // if there is NO DESCRIPTION stipulated in the entry data...

							console.log('there is no description | num = ' + $j);

							$li +=  '<span>' + $dat[$j][1] + ' ' + $dat[$j][2] + '</span>'; // then subsitute the description for the chef name

						} // end of if statement

						$li +=  '<div class="gradient"></div>' + // set as DOM element and not pseudo element due to IE8
								'</li>'; // close li element

						$wth++; // +1 onto the ul width as the li counter increases during the two loop sequences...

						if($k < 8){

							$k++;

						}else{

							$k = 0;

						} // end of if statement

					} // end of for loop

				} // end of for loop

				$wth = ($wth + 2) * 235; // find the new width of the ul by multiplying the li width (235px) be the ammount of li

				$m.s.ulWth = $wth; // store the ul width in the global settings to reference when animating the dynamic scroll with TweenMax

				if($wth > 960){ // if there are more than 4 li inside the chef-container

					$m.s.chefScroll = true; // then allow the ul to scroll
					
					$chfCon
						.find('.scroll')
						.css({'display' : 'block'}); // show the scroll buttons

				}else{

					$m.s.chefScroll = false; // do not allow the ul to scroll

					$chfCon
						.find('.scroll')
						.css({'display' : 'none'}); // hide the scroll buttons

				} // end of if statement

				$ul = $chfCon.find('ul'); // select the DOM element

				$ul.css({'width' : $wth + 'px'}) // set the length of the ul to match the number of li taht it will house
					.html($li); // add in the $li content generated from the for loop

				TweenMax.to($chfCon.find('.scroll-container'), ($ani * 5), {'scrollLeft' : 235});

			}, // end of popChef fnc

			randomNum : function($from, $to){

				return Math.floor(Math.random() * ($to - $from + 1) + $from);

			}, // end of randomNum fnc

			listeners : function($chfCon){

				var $ani = $m.s.ani,
					$ltIe9 = $m.s.ltIe9;

				if(!$ltIe9){

					$chfCon
						/*.on('touchstart', function(){ // if the $chfCon is effected by a touch then do not execute the dynamic mouse scrolling from the 'mousemove' function below...

							$m.s.chefScroll = false; // ...instead change the dynamic scroll boolean to false...

							$(this)
								.find('.scroll-container')
								.css({'overflow-x' : 'scroll'}); // ...and set the scroll container to scroll in the x-axis so that the content can be panned with a finger and clicking on a li will not jump the ul to the dynamic scroll location

						})*/
						.on('mousemove', function($e){

							if($m.s.chefScroll && !$m.s.touch){ // if the need to scroll has been set to true (or touch is not enabled) then func the scoll function...

								$m.chefs.actions.tweenScroll($e, $chfCon, $ani);

							} // end of if statement

						});

					$chfCon.find('.rnd-btn')
						.on('touchstart', function(){

							$m.chefs.actions.touch.ontouchstart($(this), $chfCon, $ani);

						});

				}else{

					$chfCon.find('.rnd-btn')
						.on('mouseenter', function(){

							$m.chefs.actions.ltIe9.onmouseenter($(this));

						})
						.on('mouseleave', function(){

							$m.chefs.actions.ltIe9.onmouseleave($(this));

						})
						.on('click', function(){

							$m.chefs.actions.ltIe9.onclick($(this), $chfCon, $ani);

						});
				} // end of if statement

				$chfCon.find('ul')
					.on('click', 'li', function(){

						$m.chefs.actions.li.onclick($(this), $ani);

					})
					.on('mouseenter', 'li', function(){

						$m.chefs.actions.li.onmouseenter($(this), $ani);

					})
					.on('mouseleave', 'li', function(){

						$m.chefs.actions.li.onmouseleave($(this), $ani);

					});
				
			}, // end of listeners fnc

			actions : {

				tweenScroll : function($e, $chfCon, $ani){

					var $mPos = $e.pageX - $chfCon.offset().left,
						$xPer = $mPos / 960,
						$wth = $m.s.ulWth,
						$scrlPos = $xPer * ($wth - 960),
						$scrlCon  = $chfCon.find('.scroll-container'),
						$scrl;

					if($mPos < 50){

						$scrl = $chfCon.find('.scroll[data-dir="left"]');

						//console.log('hide left');

						TweenMax.to($scrl, $ani, {'opacity' : '0', onComplete : hideComplete});

					}else if($mPos > 910){

						$scrl = $chfCon.find('.scroll[data-dir="right"]');

						//console.log('hide right');

						TweenMax.to($scrl, $ani, {'opacity' : '0', onComplete : hideComplete});

					}else{

						$scrl = $chfCon.find('.scroll');

						$scrl.css({'display' : 'block'});

						TweenMax.to($chfCon.find('.scroll'), $ani, {'opacity' : '1'});

					} // end of if statement

					function hideComplete(){

						$scrl.css({'display' : 'none'});

					} // end of enterComplete fnc

					TweenMax.to($scrlCon, ($ani * 5), {'scrollLeft' : $scrlPos});

				}, // end of tweenScroll fnc

				li : {

					onclick : function($this, $ani){

						var $reg   = $this.attr('data-region'),
							$chf   = $this.attr('data-chef'),
							$bgPos = $this.attr('data-sprite') * -200,
							$dat   = $m.s.dat[$reg].chefs[$chf],
							$mod   = $('.modal'),
							$html;

						$html = '<div class="image" style="background-position:' + $bgPos + 'px 0px"></div>' +
								'<h2>' + $dat[8] + '<span class="course">';

						if($dat[9] !== ''){ // if there is A COURSE stipulated in the entry data...

							$html += ' (' + $dat[9] + ')</span></h2>';

						}else{ // if there is NO COURSE stipulated in the entry data...

							$html += '</h2>';

						} // end of if statement
								
						$html += '<h3>Cut Used</h3>' +
								'<div>' + $dat[10] + '</div>';

						if($dat[11] !== ''){ // if there is NO DESCRIPTION stipulated in the entry data...

							$html += '<h3>Dish Description</h3>' +
									'<div>' + $dat[11] + '</div>';

						} // end of if statement

						$html += '<h3>Entrant Name</h3>' +
								'<div>' + $dat[1] + ' ' + $dat[2] + ' ' + '<span class="title">' + $dat[3] + '</span>' + '</div>' +
								'<h3>Restaurant</h3>' +
								'<ul>' +
									'<li class="break name">' + $dat[0] + '</li>' +
									'<li class="bullet break extra-address">' +
										'<ul>' +
											'<li>' + $dat[4] + '</li>' +
											'<li>' + $dat[5] + '</li>' +
											'<li>' + $dat[6] + '</li>' +
										'</ul>' +
									'</li>' +
									'<li class="bullet">Ph: ' + $dat[7] + '</li>' +
								'</ul>';

						$mod.find('.data').html($html);

						$mod.css({'display' : 'block'});
						TweenMax.to($mod, $ani, {'opacity' : '1'});

					}, // end of onclick fnc

					onmouseenter : function($this, $ani){

						TweenMax.to($this.find('.image'), $ani, {
							'top' : '-20px',
							'boxShadow':'0px 20px 30px 0 rgba(0, 0, 0, 0.25)'
						});

					}, // end of onmouseenter fnc

					onmouseleave : function($this, $ani){

						TweenMax.to($this.find('.image'), $ani, {
							'top' : '0',
							'boxShadow':'0px 5px 15px 0 rgba(0, 0, 0, 0.5)'
						});

					} // end of onmouseleave fnc

				}, // end of li obj

				ltIe9 : {

					onmouseenter : function($this){

						/*TweenMax.to($this, $ani, {
							'background-color' : $m.s.col.medBrown,
							'border' : '1px solid white'
						});*/

						$this.css({ // the above TweenMax does not work in IE8 and is now changed via straignt css with jQuery
								'background-color' : $m.s.col.medBrown,
								'border' : '1px solid white'
							});

					}, // end of onmouseenter fnc

					onmouseleave : function($this){

						/*TweenMax.to($this, $ani, {
							'background-color' : $m.s.col.medGray,
							'border' : '1px solid ' + $m.s.col.drkGray
						});*/

						$this.css({ // the above TweenMax does not work in IE8 and is now changed via straignt css with jQuery
								'background-color' : $m.s.col.medGray,
								'border' : '1px solid ' + $m.s.col.drkGray
							});

					}, // end of onmouseleave fnc

					onclick : function($this, $chfCon, $ani){

						var $dir = $this.parent().attr('data-dir'),
							$scrlCon  = $chfCon.find('.scroll-container'),
							$curSeg = $scrlCon.attr('data-seg'),
							$totSeg = ($m.s.ulWth / 235) - 4; // <----- minus 4 for the content on screen????

						if($dir === 'left'){

							if($curSeg > 0){

								$curSeg--;

								console.log('minus to the left');

							} // end of if statement

						}else{

							if($curSeg < $totSeg){

								$curSeg++;

								console.log('add to the right');

							} // end of if statement

						} // end of if statement

						console.log('$curSeg = ' + $curSeg);

						TweenMax.to($scrlCon, ($ani * 5), {'scrollLeft' : ($curSeg * 235)});

						$scrlCon.attr({'data-seg' : $curSeg});

					} // end of onclick

				}, // end of ltIe9 onj

				touch : {

					ontouchstart : function($this, $chfCon, $ani){

						var $dir = $this.parent().attr('data-dir'),
							$scrlCon = $chfCon.find('.scroll-container');

						if($dir === 'left'){

							console.log('***LEFT***');

							TweenMax.to($scrlCon, $ani, {'scrollLeft' : '-=235'});

						}else{

							console.log('***RIGHT***');

							TweenMax.to($scrlCon, $ani, {'scrollLeft' : '+=240'});

						} // end of if statement

					} // end of ontouchstart fnc

				} // end of touch obj

			} // end of actions obj

		}, // end of chefs obj

		modal : {

			init : function(){

				var $mod = $('.modal');

				$m.modal.listeners($mod);

			}, // end of init fnc

			listeners : function($mod){

				var $ani = $m.s.ani;

				$mod.find('.close')
					.on('click', function(){

						$m.modal.actions.close.onclick($(this), $mod, $ani);

					})
					.on('mouseenter', function(){

						$m.modal.actions.close.onmouseenter($(this), $ani);

					})
					.on('mouseleave', function(){

						$m.modal.actions.close.onmouseleave($(this), $ani);

					});

			}, // end of listeners fnc

			actions : {

				close : {

					onclick : function($this, $mod, $ani){

						TweenMax.to($mod, $ani, {'opacity' : '0', onComplete : clickComplete});

						function clickComplete(){

							$mod.css({'display' : 'none'});

						} // end of clickComplete fnc

					}, // end of onclick fnc

					onmouseenter : function($this, $ani){

						$this.css({
								'background-color' : $m.s.col.medBrown,
								'border' : '1px solid white'
							}, 250);

						/*if(!$m.s.ltIe9){ // TweenMax does not work in this situation with IE8 so animate for newer browsers...

							TweenMax.to($this, $ani, {
								'background-color' : $m.s.col.medBrown,
								'border' : '1px solid white'
							});

						}else{ // ...and set css with jQuery

							$this.css({
									'background-color' : $m.s.col.medBrown,
									'border' : '1px solid white'
								});

						} // end of if statement*/

					}, // end of onmouseenter fnc

					onmouseleave : function($this, $ani){

						$this.css({
								'background-color' : $m.s.col.medGray,
								'border' : '1px solid ' + $m.s.col.drkGray
							}, 250);

						/*if(!$m.s.ltIe9){ // TweenMax does not work in this situation with IE8 so animate for newer browsers...

							TweenMax.to($this, $ani, {
								'background-color' : $m.s.col.medGray,
								'border' : '1px solid ' + $m.s.col.drkGray
							});

						}else{ // ...and set css with jQuery

							$this.css({
									'background-color' : $m.s.col.medGray,
									'border' : '1px solid ' + $m.s.col.drkGray
								});

						} // end of if statement*/

					} // end of onmouseleave fnc

				} // end of close obj
			
			} // end of actions obj
		
		}, // end of modal obj

		slider : {

			init : function(){

				var $mc = $('.map-container'), // map container in which to find the additional elements from...
					$sld = $mc.find('.slider-container'),
					$tl = $m.slider.timeline($sld);

				$m.slider.listeners($mc, $sld, $tl);

			}, // end of init

			timeline : function($sld){

				var $tl = new TimelineMax(),
					$ani = $m.s.ani * 10,
					$sldImg = $sld.find('.slider-images'),
					//	$sldCtr = $sld.find('.slider-controls'),
					$wth = 940,
					$len = $sldImg.find('li').length,
					$i, $cur, $nxt; // nulls

				for($i = 0; $i < $len - 1; $i++){

					$cur = $sldImg.find($('li[data-num="' + $i + '"]')); // select thet CURRENT image in view
					$nxt = $cur.next(); // select the NEXT image that will become the CURRENT image

					$tl.addLabel('label-' + $i)
                       .to($cur, $ani, {'left' : '-' + ($wth / 2) + 'px'})
                       .to($cur.find('.darken'), $ani, {'opacity' : '0.8', delay : '-' + $ani})
                       .to($nxt, $ani, {'left' : '0', delay : '-' + $ani})
                       .to($nxt, $ani, {delay : '3'});

                    /*$cur = $sldCtr.find($('li[data-num="' + ($i) + '"]')); // select thet CURRENT li in view

                    if($i === $len - 2){

						$nxt = $sldCtr.find($('li[data-num="' + (0) + '"]'));

					}else{

						$nxt = $cur.next(); // select the NEXT li that will become the CURRENT li

					} // end if statement

                    $tl.to($cur, $ani, {'background-color' : 'white', delay : '-' + $ani})
                       .to($nxt, $ani, {'background-color' : 'black', delay : '-' + $ani})
                       .to($nxt, $ani, {delay : '3'});
                    
                    //$tl.delay(3);*/

				} // end of for loop

				$tl.pause();

				return $tl;

			}, // end of timelien fnc

			listeners : function($mc, $sld, $tl){

				var $ani = $m.s.ani,
					$sldImg = $sld.find('.slider-controls'),
					$sldOvr = $sld.find('.overlay'),
					$regMap = $mc.find('.region-map'),
					$regLst = $mc.find('.region-list'),
					$touch = $m.s.touch;

				$sldImg
					.on('touchstart', function(){

						$m.slider.actions.ontouchstart($tl, $sldOvr, $regMap, $regLst, $ani);

					})
					.on('mouseleave', function(){

						$m.slider.actions.onmouseleave($tl, $sldOvr, $regMap, $regLst, $ani, $touch);

					})
					.on('mouseenter', 'li', function(){

						$m.slider.actions.onmouseenter($(this), $sldOvr, $tl, $regMap, $regLst, $ani, $touch);

					});

			}, // end of listeners fnc

			actions : {

				ontouchstart : function($this, $sldOvr, $tl, $regMap, $regLst, $ani){

					clearTimeout($m.s.sldTo);

					var $datNum = $this.attr('data-num');

					$this.siblings().css({'background-color' : 'white'});
					$this.css({'background-color' : 'black'});

					$tl.pause();

					TweenMax.to($sldOvr, $ani, {'opacity' : '1', onComplete : tlSeek});

					TweenMax.to($regMap, $ani, {'opacity' : '0'});
					TweenMax.to($regLst, $ani, {'opacity' : '0'});
					
					function tlSeek(){

						$tl.seek('label-' + $datNum);

						TweenMax.to($sldOvr, $ani, {'opacity' : '0'});

					} // end of tlSeek fnc

					$m.s.sldTo = setTimeout(function(){

						//$tl.play();

						TweenMax.to($sldOvr, $ani * 5, {'opacity' : '0.75'});

						TweenMax.to($regMap, $ani, {'opacity' : '1'});
						TweenMax.to($regLst, $ani, {'opacity' : '1'});

					}, 3000);

				}, // end of ontouchstart fnc

				onmouseleave : function($tl, $sldOvr, $regMap, $regLst, $ani, $touch){

					if($touch){ // if the current device is being used via touch then disable this function...

						return '';

					} // end of if statement

					TweenMax.to($sldOvr, $ani * 5, {'opacity' : '0.75'});

					TweenMax.to($regMap, $ani, {'opacity' : '1'});
					TweenMax.to($regLst, $ani, {'opacity' : '1'});

					//$m.s.sldTo = setTimeout(function(){

						//$tl.play();

					//}, 3000);

				}, // end of on mouseleave fnc

				onmouseenter : function($this, $sldOvr, $tl, $regMap, $regLst, $ani, $touch){

					if($touch){ // if the current device is being used via touch then disable this function...

						return '';

					} // end of if statement

					//clearTimeout($m.s.sldTo);

					var $datNum = $this.attr('data-num');

					$this.siblings().css({'background-color' : 'white'});
					$this.css({'background-color' : 'black'});

					$tl.pause();

					TweenMax.to($sldOvr, $ani, {'opacity' : '1', onComplete : tlSeek});

					TweenMax.to($regMap, $ani, {'opacity' : '0'});
					TweenMax.to($regLst, $ani, {'opacity' : '0'});
					
					function tlSeek(){

						$tl.seek('label-' + $datNum);

						TweenMax.to($sldOvr, $ani, {'opacity' : '0'});

					} // end of tlSeek fnc

				} // end of onmouseenter fnc

			} // end of actions obj

		} // end of slider obj

	}; // end of module obj

	(function(){

		$m.init();

	})();

}); // end of document ready...















