var APP = APP || {};

(function(){
	APP.Mars = function( x, y, squareSize, $el ) {
		this.x           = parseInt(x, 10);
		this.y           = parseInt(y, 10);
		this.squareSize  = squareSize;
		this.$el         = $el;
		this.initialised = false;
	}

	APP.Mars.prototype.setSize = function(){
		this.$el.css({
			"width" : (this.x + 1) * this.squareSize,
			"height" : (this.y + 1) * this.squareSize
		});
	};

	APP.Mars.prototype.plotGrid = function(){
		var i,
			j,
			length1 = (this.x + 1) * this.squareSize,
			length2 = (this.y + 1) * this.squareSize,
			self    = this,
			idX     = 0,
			idY     = 0;

		function addSquare( x, y, idX, idY ){
			var $square = $( "<span></span>" , {
					"class" : "mars-square"
				}).css( {
					"left"  : x + "px",
					"bottom" : y + "px" ,
					"width" : self.squareSize,
					"height" : self.squareSize
				}).attr("id", idX + "_" + idY );

			self.$el.append( $square );
		}

		for( i = 0; i < length1; i += this.squareSize ) {
			for( j = 0; j < length2; j += this.squareSize ) {
				idX = i / this.squareSize;
				idY = j / this.squareSize;

				addSquare( i, j, idX, idY );
			}
		}
	};

	APP.Mars.prototype.init = function(){
		this.setSize();
		this.plotGrid();
		this.initialised = true;
		APP.$mars        = this.$el;
		APP.x            = this.x;
		APP.y            = this.y;
	};

}());




