var housingData =  [
	{
		location: 'Tampa, FL',
		houses: [
			{
				img: 'http://imagesus.homeaway.com/mda01/645856b8-0c65-4143-83eb-21832d115d4a.1.10',
				cost: '500,000',
				netgain: '200,000',
				savings: '4,500',
				hospitalDist: '3.4'
			},
			{
				img: 'http://photos1.zillowstatic.com/p_h/ISx783dl1illej1000000000.jpg',
				cost: '325,000',
				netgain: '375,000',
				savings: '3,600',
				hospitalDist: '1.5'
			},		
			{
				img: 'http://photos1.zillowstatic.com/p_h/IS13nio0iyc9511000000000.jpg',
				cost: '535,000',
				netgain: '165,000',
				savings: '2,100',
				hospitalDist: '1.8'
			},
		]
	},

	{
		location: 'Issaquah, WA',
		houses: [
			{
				img: 'http://photos1.zillowstatic.com/p_h/ISplhdjoddrw020000000000.jpg',
				cost: '420,000',
				netgain: '280,000',
				savings: '2,100',
				hospitalDist: '1.2'
			},
			{
				img: 'http://photos1.zillowstatic.com/p_h/IS1n2stxyi1jjx1000000000.jpg',
				cost: '560,000',
				netgain: '140,000',
				savings: '3,400',
				hospitalDist: '2.4'
			},
			{
				img: 'http://photos1.zillowstatic.com/p_h/IS1jffth6yqq9p1000000000.jpg',
				cost: '335,000',
				netgain: '365,000',
				savings: '1,400',
				hospitalDist: '1.2'
			},
		]
	},
	{
		location: 'Palm Beach Gardens, FL',
		houses: [
			{
				img: 'http://photos1.zillowstatic.com/p_h/IS1jffth6yqq9p1000000000.jpg',
				cost: '250,000',
				netgain: '350,000',
				savings: '1,600',
				hospitalDist: '1.5'
			},
			{
				img: 'http://photos1.zillowstatic.com/p_h/ISx783dl1illej1000000000.jpg',
				cost: '295,000',
				netgain: '405,000',
				savings: '4,600',
				hospitalDist: '1.0'
			},
			{
				img: 'http://photos1.zillowstatic.com/p_h/ISx783dl1illej1000000000.jpg',
				cost: '295,000',
				netgain: '405,000',
				savings: '4,600',
				hospitalDist: '1.0'
			},
		]
	},
];

$(function() {
	/* TODO use real ajax call
	$.get(url, function() {
	});*/
	var House = function(img, cost, netgain, savings, hospitalDist) {
		this.img = img;
		this.cost = cost;
		this.netgain = netgain;
		this.savings = savings;
		this.hospitalDist = hospitalDist;


		this.buildDom = function() {
			var wrapper = $("<div class='res-house'></div>");
			var imgDom = $("<img src='" + img + "' ></img>");
			var costBadge = $("<span class='badge'>$" + this.cost + "</span>");
			var netGain = $("<div class='caption'><span class='label'>Net Gain:</span><span class='value'>$" + this.netgain + "</span></div>");
			var savings = $("<div class='caption'><span class='label'>Monthly Savings:</span><span class='value'>$" + this.savings + "</span></div>");
			var hospitalDist = $("<div class='caption'><span class='label'>Nearest Hospital:</span><span class='value'>" + this.hospitalDist + " miles</span></div>");

			var caption = $("<div class='caption-container'></div>");
			caption.append(netGain);
			caption.append(savings);
			caption.append(hospitalDist);

			wrapper.append(imgDom);
			wrapper.append(costBadge);
			wrapper.append(caption);
			return wrapper;
		}

		this.$el = this.buildDom();
	};


	var Area = function(index, location, houses) {
		this.location = location;
		this.houses = houses;

		this.buildDom = function() {
			var wrapper = $("<div class='res-locations carousel slide' id='location_" + index + "'/>");
			var header = $("<div class='res-loc-header'>Location " + (index + 1) + "<span class='res-address'>" + this.location + "</span></div>");
			wrapper.append(header);
			wrapper.append("<ul class='res-listings carousel-inner'/>");
			return wrapper;
		}

		this.buildHouses = function() {
			var $listing = this.$el.find(".res-listings");
			$.each(this.houses, function(idx, house) {
				var house = new House(house.img, house.cost, house.netgain, house.savings, house.hospitalDist);
				$listing.append(house.$el);
			});
		}
		this.$el = this.buildDom();
		this.buildHouses();


	}; 

	$.each(housingData, function(idx, area) {
		var area = new Area(idx, area.location, area.houses);
		$(".res-home-container").append(area.$el);
	});


})


