(function() {
  var App, Block, Images, key, manifests, preload, val, _ref;

  Images = (function() {
    var conf;

    function Images() {}

    conf = {
      block: "./images/block.jpg",
      stone: "./images/stone.jpg"
    };

    Images.all = function() {
      return conf;
    };

    Images.get = function(key) {
      return conf[key];
    };

    return Images;

  })();

  App = (function() {

    function App(canvas_id) {
      var block;
      this.stage = new Stage(canvas_id);
      block = new Block(10, 20);
      this.stage.addChild(block.image);
      this.stage.update();
      this.stage.enableMouseOver(10);
      Ticker.setFPS(15);
      Ticker.addListener(this.stage);
    }

    App.prototype.start = function() {
      return (function(stage) {
        return setInterval(function() {
          return stage.update();
        }, 20);
      })(this.stage);
    };

    return App;

  })();

  Block = (function() {

    function Block(x, y) {
      var imagepath,
        _this = this;
      imagepath = Images.get('block');
      this.image = new Bitmap(imagepath);
      this.image.width = this.image.height = 130;
      this.image.x = 100;
      this.image.y = 100;
      this.image.onMouseOver = function(e) {
        return _this.runaway();
      };
      return this;
    }

    Block.prototype.runaway = function() {
      return Tween.get(this.image).to({
        x: Math.random() * this.image.parent.canvas.width,
        y: Math.random() * this.image.parent.canvas.height
      }, 500);
    };

    return Block;

  })();

  manifests = [];

  _ref = Images.all();
  for (key in _ref) {
    val = _ref[key];
    manifests.push({
      src: val
    });
  }

  preload = new PreloadJS();

  preload.loadManifest(manifests);

  preload.onComplete = function() {
    var app;
    app = new App('main');
    return app.start();
  };

}).call(this);
