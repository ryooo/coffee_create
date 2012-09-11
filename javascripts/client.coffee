# -------------------
# 画像管理
# -------------------
class Images
  conf =
    block: "./images/block.jpg"
    stone: "./images/stone.jpg"
  @all: ->
    return conf
  @get: (key)->
    return conf[key]


# -------------------
# Stageラッパー
# -------------------
class App
  constructor: (canvas_id)->
    @stage = new Stage(canvas_id)
    block = new Block(10, 20)
    @stage.addChild(block.image)
    @stage.update()
    
    @stage.enableMouseOver(10)
    Ticker.setFPS(15)
    Ticker.addListener(@stage)

  start: ->
    ((stage) ->
      setInterval ->
        stage.update()
      , 20
    ) @stage


# -------------------
# ブロック
# -------------------
class Block
  constructor: (x, y)->
    imagepath = Images.get('block')
    @image = new Bitmap(imagepath)
    @image.width = @image.height = 130
    @image.x = 100
    @image.y = 100
    @image.onMouseOver = (e)=>@runaway()
    return @
  runaway: ->
    Tween.get(@image).to({
      x: Math.random() * @image.parent.canvas.width,
      y: Math.random() * @image.parent.canvas.height
    }, 500)


# -------------------
# メイン処理
# -------------------
manifests = []
for key, val of Images.all()
  manifests.push({src: val})

preload = new PreloadJS()
preload.loadManifest(manifests);
preload.onComplete = ->
  app = new App('main')
  app.start()

