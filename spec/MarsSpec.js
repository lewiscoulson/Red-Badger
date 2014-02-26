describe("Mars", function() {
  describe( "Creating an instance of mars", function(){
	it("Should be able to create an instance", function() {
		var mars = new APP.Mars( 5, 3, 25, $(".mars") );

		expect( mars instanceof APP.Mars ).toBe(true);
	});

	it("Should be able to set number of horizontal squares correctly", function() {
		var mars = new APP.Mars( 5, 3, 25, $(".mars") );

		expect( mars.x ).toBe( 5 );
	});

	it("Should be able to set number of vertical squares correctly", function() {
		var mars = new APP.Mars( 5, 3, 25, $(".mars") );

		expect( mars.y ).toBe( 3 );
	});

	it("Should be able to set size of a square correctly", function() {
		var mars = new APP.Mars( 5, 3, 25, $(".mars") );

		expect( mars.squareSize ).toBe( 25 );
	});

	it("Should be able to set mars element as a jquery object instance ", function() {
		var mars = new APP.Mars( 5, 3, 25, $(".mars") );

		expect( mars.$el instanceof $ ).toBe( true );
	});
  });	

  describe( "Setting the size of mars", function(){
	it("Should be able to set the size of mars correctly", function() {
		setFixtures('<div class="mars"></div>');

		var mars = new APP.Mars( 5, 3, 25, $(".mars") );
		mars.setSize();

		var width = parseInt( mars.$el.css( "width" ), 10 );
		var height = parseInt( mars.$el.css( "height" ), 10 );

		expect( width ).toBe( (mars.x + 1) * mars.squareSize );
		expect( height ).toBe( (mars.y + 1) * mars.squareSize );
	});
  });	

  describe( "Should sucessfully initialise", function(){
	it("Should be able to be initialised", function() {
		setFixtures('<div class="mars"></div>');

		var mars = new APP.Mars( 5, 3, 25, $(".mars") );
		mars.init();

		expect( mars.initialised ).toBe( true );
	});
  });
  
});

describe( "Martian Robot", function(){
	describe("Should be able to create an instance of Martian Robot", function(){
		it("Should create a new instance", function(){
			var martianRobot = new APP.MartianRobot();

			expect( martianRobot instanceof APP.MartianRobot ).toBe( true );
		});

		it("Should be able to set initial position", function(){
			var martianRobot = new APP.MartianRobot( 1, 1, "E" );

			expect( martianRobot.x ).toBe( 1 );
			expect( martianRobot.y ).toBe( 1 );
			expect( martianRobot.o ).toBe( "E" );
		});

		it("Should accept string of input commands", function(){
			var martianRobot = new APP.MartianRobot( 1, 1, "E", "RFRFRFRF" );
			
			expect( martianRobot.input ).toBe( "RFRFRFRF" );
		});
	});

	describe("Should be able to add Martian Robot to UI", function(){
		it("Should add Martian Robot to UI", function(){
			setFixtures('<div class="mars"></div>');

			var mars = new APP.Mars( 5, 3, 25, $(".mars") );
			mars.init();

			var martianRobot = new APP.MartianRobot( 1, 1, "E", "RFRFRFRF" );
			martianRobot.addToGrid();

			expect( $("#1_1").find(".martian-robot").length ).toBe( 1 );
		});
	});

	describe("Should be able to make Martian change position based on input", function(){
		it("Should be able to change orientation", function(){
			setFixtures('<div class="mars"></div>');

			var mars = new APP.Mars( 5, 3, 25, $(".mars") );
			mars.init();

			var martianRobot = new APP.MartianRobot( 1, 1, "E", "LLFF" );
			martianRobot.addToGrid();
			martianRobot.moveBasedOnInput();

			expect( martianRobot.o ).toBe( "W" );

		});
	});

	describe("Should be able to output final position", function(){
		it("Should output correct message", function(){
			setFixtures('<div class="mars"></div>');

			var mars = new APP.Mars( 5, 3, 25, $(".mars") );
			mars.init();

			var martianRobot1 = new APP.MartianRobot( 1, 1, "E", "RFRFRFRF" );
			martianRobot1.init();
			var output1 = martianRobot1.showOutput();
			expect( output1 ).toEqual( "11E" );

			var martianRobot2 = new APP.MartianRobot( 3, 2, "N", "FRRFLLFFRRFLL" );
			martianRobot2.init();
			var output2 = martianRobot2.showOutput();
			expect( output2 ).toEqual( "33NLOST" );

			var martianRobot3 = new APP.MartianRobot( 0, 3, "W", "LLFFFLFLFL" ); //
			martianRobot3.init();
			var output3 = martianRobot3.showOutput();
			expect( output3 ).toEqual( "23S" );

		});
	});
});