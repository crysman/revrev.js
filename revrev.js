(function($, w, d, undefined){

	Math.randomNumber = function (fromThis, toThis) {
		return Math.floor(Math.random() * ( toThis - fromThis + 1 )) + fromThis;
	};

	$.fn.revrev = function () {
		var defs = {
			just: 'string', // for now.
			revrevCray: 80, // pretty cray, not TOO cray.
			revrevClrz: [], // whatever sweet colors.
			revrevAlso: [] // cap, updown, squish, colorize. 
		};
		return this.each(function(){
			var elem = $(this)
				, data = elem.data()
				, cfg = $.extend({}, defs, data);

			if ( typeof data.revrevClrz !== 'undefined' ) {
				cfg.revrevClrz = data.revrevClrz.replace(/\s+/g, '').replace(/,/g, '|');
				if ( !!cfg.revrevClrz.match(/rgb/i) ) cfg.revrevClrz = cfg.revrevClrz.replace(/\|([0-9|\.])/g, ',$1');
				cfg.revrevClrz = defs.revrevClrz.concat( cfg.revrevClrz.split('|') );
			};

			if ( typeof data.revrevAlso !== 'undefined' )
				cfg.revrevAlso = defs.revrevAlso.concat( data.revrevAlso.replace(/\s+/g, '').split(',') );

			var frag = d.createDocumentFragment()
				, origElem = elem
				, html = ''
				, elem = cfg.just === 'string' ? $.trim( origElem.html() ) : origElem.children().length
				, i = 0
				, l = elem.length
				, cray = cfg.revrevCray
				, noRev = []
				, noRevCap = Math.ceil(l - l * (cray / 100))
				, colors = cfg.revrevClrz
				, also = cfg.revrevAlso
				, cap = $.inArray('cap', also) > -1
				, updown = $.inArray('updown', also) > -1
				, squish = $.inArray('squish', also) > -1
				, colorize = $.inArray('colorize', also) > -1
				, tags = []
				, tagElem
				, tagContent
				, tagBuilding = false;

			while ( noRev.length < noRevCap ) {
				var randomNumber = Math.randomNumber(0, l);
				if ( $.inArray(randomNumber, noRev) === -1 ) noRev.push(randomNumber);
			};

			for ( ; i < l; i++ ) {
				var rev = $.inArray(i, noRev) === -1
					, revChar = elem.charAt(i)
					, nothing = revChar === ' '
					, house = d.createElement('span')
					, classes = [];

				if ( revChar === '<' ) {
					tagBuilding = true;
					if ( tags.length === 2 ) {
						tagElem += revChar;
					} else {
						tags.house = house;
						tagElem = revChar;
					};
				} else if ( tagElem !== '' && revChar !== '>' ) {
					tagElem += revChar;
				} else if ( tagElem !== '' && revChar === '>' ) {
					tags.push( tagElem + '>' );
					tagElem = '';
					tagContent = '';
				} else if ( tags.length === 1 ) {
					tagContent += revChar;
				} else if ( tags.length === 2 ) {
					tagBuilding = false;
					tags = [];
				};

				if ( rev && cray > 0 )
					classes.push('revrev');
				if ( cap && i % 2 === 0 && !nothing )
					classes.push('revrevcap');
				if ( updown && i % 2 === 1 && !nothing )
					classes.push('revrevupdown');
				if ( squish && i % 2 === 0 )
					classes.push('revrevsquish');
				if ( colorize && i % ( l / 3 ) < ( l / 6 ) )
					house.style.color = colors[Math.randomNumber(0, colors.length)];

				if ( classes.length > 0 )
					house.className = classes.join(' ');

				if ( tagBuilding ) {
					if ( tags.length === 1 ) {
						var tagContentBuild = tagContent;
					} else if ( tags.length === 2 ) {
						tags.house.innerHTML = tags[0] + tagContentBuild + tags[1];
						frag.appendChild(tags.house);
					};
				} else {
					house.innerHTML = revChar;
					frag.appendChild(house);
				};
			};

			return origElem.html(frag);
		});
	};

	$(function(){

		$('*[data-revrev]').revrev();

	});

})(jQuery, window, document);
