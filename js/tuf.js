var FUT = FUT || {};

(function(){
	
	//declare strict for cleaner 
	'use strict';
	
	//controller object
	FUT.controller = {
		init: function(){
			FUT.router.init();
		}
	};
	
	//page object
	FUT.page = {
		//render method
		render: function (route) {
			var data = eval('FUT.'+route);
			
			Transparency.render(qwery('[data-route='+route+']')[0], data);
			//call change method in router object to update the page
			FUT.router.change();
		}
	}
	
	//router object
	FUT.router = {
		//weet niet wat hier gebeurt?
		init: function(){
			routie({
				'/game': function(){
					FUT.page.render('game');
				},
				'/ranking': function(){
					FUT.page.render('ranking');
				},
				'/schedule': function(){
					FUT.page.render('schedule');
				}
			});
		},
		//change method
		change: function(){
			var route = window.location.hash.slice(2),
			sections = qwery('section'),
			all_nav = qwery('nav > a'),
			nav= qwery('a#'+route)[0],
			section = qwery('[data-route='+route+']')[0];
			
			if (section){
				for (var i=0; i < sections.length; i++){
					sections[i].classList.remove('active');
					all_nav[i].classList.remove('active');
				}
				section.classList.add('active');
				nav.classList.add('active');
			}
			//if there is no route found, go to default state
			if (!route){
				sections[0].classList.add('active');
			}
		}
		
	} 
	
	//game object
	FUT.game = {
		title:'Game',
		sub_title:'Games die gespeeld zijn',
		games: [
			{
				nr:'1',
				team:'Gekke henkies',
				score1:'2',
				team2:'Pierre Pietjes',
				score2:'3'
			}
		]
	}
	
	//ranking object
	FUT.ranking = {
		title:'Ranking',
		sub_title:'Ranking tot nu toe',
		teams: [
			{
				team:'Gekke Henkies',
				win:'3',
				lost:'1',
				sw:'1',
				sl:'3',
				pw:'13',
				pl:'55'
			}
		]
	}
	
	//schedule object
	FUT.schedule = {
		title:'Schedule',
		sub_title:'Games die nu nog gespeeld moeten worden',
		dates: [
			{
				date:'29/12/2013',
				team:'Gekke Henkies',
				teamscore1:'2',
				team2:'Pierre Pietjes',
				teamscore2:'1'
			}
		]
	}
	
	//when dom is loaded, execute JS
	domready(function(){
		FUT.controller.init();
	});
})();