var housingData =  [
	{
		location: '4088 240th pl SE, Issaquah, WA, 98029',
		houses: [
			{
				img: 'http://imagesus.homeaway.com/mda01/645856b8-0c65-4143-83eb-21832d115d4a.1.10',
				cost: '500,000',
				netgain: '200,000',
				savings: '4,500',
				hospitalDist: '3.4'
			},
			{
				img: 'http://imagesus.homeaway.com/mda01/645856b8-0c65-4143-83eb-21832d115d4a.1.10',
				cost: '500,000',
				netgain: '200,000',
				savings: '4,500',
				hospitalDist: '3.4'
			},			
			{
				img: 'http://imagesus.homeaway.com/mda01/645856b8-0c65-4143-83eb-21832d115d4a.1.10',
				cost: '500,000',
				netgain: '200,000',
				savings: '4,500',
				hospitalDist: '3.4'
			}
		]
	},
	{
		location: '4088 240th pl SE, Issaquah, WA, 98029',
		houses: [
			{
				img: 'http://imagesus.homeaway.com/mda01/645856b8-0c65-4143-83eb-21832d115d4a.1.10',
				cost: '500,000',
				netgain: '200,000',
				savings: '4,500',
				hospitalDist: '3.4'
			},
		]
	},
	{
		location: '4088 240th pl SE, Issaquah, WA, 98029',
		houses: [
			{
				img: 'http://imagesus.homeaway.com/mda01/645856b8-0c65-4143-83eb-21832d115d4a.1.10',
				cost: '500,000',
				netgain: '200,000',
				savings: '4,500',
				hospitalDist: '3.4'
			},
		]
	}
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


