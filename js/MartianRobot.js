var APP    = APP || {};
APP.scents =  APP.scents || [];

(function(){
	APP.MartianRobot = function( x, y, o, input ){
		this.x           = parseInt(x, 10);
		this.y           = parseInt(y, 10);
		this.o           = o;
		this.input       = input;
		this.addedToGrid = false;
		this.$el         = $( "<span></span>", {"class": "martian-robot"}).attr("data-orientation",this.o);
		this.isLost      = false;
		this.isComplete  = false,
		this.$currentCell;
	}

	APP.MartianRobot.prototype.addToGrid = function(){
		this.addedToGrid = true;

		var gridId = "#" + (this.x + "_" + this.y); 

		this.$el.appendTo( $( gridId ) );
	};

	APP.MartianRobot.prototype.moveBasedOnInput = function(){
		var commands = this.input.split(""),
			i = 0,
			length = commands.length,
			self = this,
			maxX = $( ".mars" );

		function leaveScent() {
			var newId = "#" + self.x + "_" + self.y;
			$( newId ).addClass( "scent" );
			self.isLost = true;
			APP.scents.push( self.x.toString() + self.y );
		}

		function fallOffMars() {
			self.$el.remove();
		}

		function updateCurrentCell() {
			var $martianRobot = $(".martian-robot");
			self.$currentCell = $( "#" + self.x + "_" + self.y );

			$martianRobot.appendTo( $( self.$currentCell ) );
			$martianRobot.attr("data-orientation",self.o);
		}

		function move() {
			var command      = commands[i],
				orientations = ["N","E","S","W"],
				pos          = orientations.indexOf( self.o );

			if( command == "L" ) {
				if( pos === 0 ) {
					self.o = orientations[ orientations.length - 1 ];
				} else {
					self.o = orientations[ pos - 1 ];
				}

			} else if( command == "R" ) {
				if( pos === orientations.length - 1 ) {
					self.o = orientations[0];
				} else {
					self.o = orientations[ pos + 1 ];
				}

			} else if( command == "F" ) {
				var currentOrientation = self.o,
					$current           = $( self.$currentCell );

				if( currentOrientation === "N" ) {

					if( APP.scents.indexOf( self.x.toString() + self.y ) == -1 ) {
						if( self.y <= APP.y ) {
							self.y++;

							if( self.y > APP.y ) { 
								self.y = APP.y;
								leaveScent();
								fallOffMars();
							}
						}
					}
				} else if( currentOrientation === "E" ) {
					if( self.x <= APP.x ){
						self.x += 1;

						if( self.x > APP.x ) {
							self.x = APP.x ;

							if( APP.scent !== self.x.toString() + self.y ) {
								leaveScent();
								fallOffMars();
							}
						}
					} 
				} else if( currentOrientation === "S" ) {
					if( self.y >= 0  ){
						self.y -= 1;

						if( self.y < 0 ) {
							self.y = 0;	
							if( APP.scent !== self.x.toString() + self.y ) {
								leaveScent();
								fallOffMars();
							}
						}
					}
				} else if( currentOrientation === "W" ) {
					if( self.x >= 0 ){
						self.x -= 1;

						if( self.x < 0 ) {
							self.x = 0;
							if( APP.scent !== self.x.toString() + self.y ) {
								leaveScent();
								fallOffMars();
							}
						}
					}
				}
			}

			updateCurrentCell();

			i++;

			if( i < length && !self.isLost ) {
				move();
			} else {
				self.isComplete = true;
				fallOffMars();
				self.showOutput();
			}
		}
		move();
	};

	APP.MartianRobot.prototype.showOutput = function(){
		return this.x.toString() + this.y + this.o + (this.isLost === true ? "LOST" : "");
	};

	APP.MartianRobot.prototype.init = function(){
		this.addToGrid();
		this.moveBasedOnInput(); 
	};

}());

