if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'where-home-is'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'where-home-is'.");
}
this['where-home-is'] = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwCCE = Kotlin.throwCCE;
  var Iterable = Kotlin.kotlin.collections.Iterable;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var toList = Kotlin.kotlin.collections.toList_7wnvza$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  function Background() {
    this.image = null;
    this.x = 0;
    this.y = 0;
    this.endX = 0;
    this.endY = 0;
    this.speed = 0;
    this.depth = 0;
  }
  var Math_0 = Math;
  Background.prototype.onTick_14dthe$ = function (dt) {
    var x = this.x - this.endX;
    var tmp$ = Math_0.abs(x) <= dt * this.speed;
    if (tmp$) {
      var x_0 = this.y - this.endY;
      tmp$ = Math_0.abs(x_0) <= dt * this.speed;
    }
    if (tmp$)
      return;
    if (this.x < this.endX) {
      this.x += dt * this.speed;
    }
    if (this.x > this.endX) {
      this.x -= dt * this.speed;
    }
    var x_1 = this.x - this.endX;
    if (Math_0.abs(x_1) <= dt * this.speed) {
      this.x = this.endX;
    }
    if (this.y < this.endY) {
      this.y += dt * this.speed;
    }
    if (this.y > this.endY) {
      this.y -= dt * this.speed;
    }
    var x_2 = this.y - this.endY;
    if (Math_0.abs(x_2) <= dt * this.speed) {
      this.y = this.endY;
    }
  };
  Background.prototype.onRender_2mh1z0$ = function (ctx, dt) {
    ctx.translate(this.x, this.y);
    if (this.image.complete && this.image.naturalHeight !== 0) {
      ctx.drawImage(this.image, 0.0, 0.0);
    }
  };
  Background.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Background',
    interfaces: [Renderable]
  };
  function Background_init(image, x, y, endX, endY, speed, depth, $this) {
    if (endX === void 0)
      endX = x;
    if (endY === void 0)
      endY = y;
    if (speed === void 0)
      speed = 1.0;
    if (depth === void 0)
      depth = 0;
    $this = $this || Object.create(Background.prototype);
    Background.call($this);
    $this.image = image;
    $this.x = x;
    $this.y = y;
    $this.endX = endX;
    $this.endY = endY;
    $this.speed = speed;
    $this.depth = depth;
    return $this;
  }
  function Background_init_0(image, x, y, endX, endY, speed, depth, $this) {
    if (endX === void 0)
      endX = x;
    if (endY === void 0)
      endY = y;
    if (speed === void 0)
      speed = 1.0;
    if (depth === void 0)
      depth = 0;
    $this = $this || Object.create(Background.prototype);
    Background_init(image, x, y, endX, endY, speed, depth, $this);
    return $this;
  }
  function Background_init_1(imageSource, x, y, endX, endY, speed, depth, $this) {
    if (endX === void 0)
      endX = x;
    if (endY === void 0)
      endY = y;
    if (speed === void 0)
      speed = 1.0;
    if (depth === void 0)
      depth = 0;
    $this = $this || Object.create(Background.prototype);
    Background.call($this);
    var tmp$;
    $this.image = Kotlin.isType(tmp$ = document.createElement('img'), HTMLImageElement) ? tmp$ : throwCCE();
    $this.image.src = imageSource;
    $this.x = x;
    $this.y = y;
    $this.endX = endX;
    $this.endY = endY;
    $this.speed = speed;
    $this.depth = depth;
    return $this;
  }
  function Background_init_2(imageSource, x, y, endX, endY, speed, depth, $this) {
    if (endX === void 0)
      endX = x;
    if (endY === void 0)
      endY = y;
    if (speed === void 0)
      speed = 1.0;
    if (depth === void 0)
      depth = 0;
    $this = $this || Object.create(Background.prototype);
    Background_init_1(imageSource, x, y, endX, endY, speed, depth, $this);
    return $this;
  }
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  function Backgrounds() {
    this.backgrounds = LinkedHashMap_init();
  }
  function Backgrounds$iterator$lambda(bg) {
    return -bg.depth | 0;
  }
  var sortedWith = Kotlin.kotlin.collections.sortedWith_eknfly$;
  var wrapFunction = Kotlin.wrapFunction;
  var compareBy$lambda = wrapFunction(function () {
    var compareValues = Kotlin.kotlin.comparisons.compareValues_s00gnj$;
    return function (closure$selector) {
      return function (a, b) {
        var selector = closure$selector;
        return compareValues(selector(a), selector(b));
      };
    };
  });
  var Comparator = Kotlin.kotlin.Comparator;
  function Comparator$ObjectLiteral(closure$comparison) {
    this.closure$comparison = closure$comparison;
  }
  Comparator$ObjectLiteral.prototype.compare = function (a, b) {
    return this.closure$comparison(a, b);
  };
  Comparator$ObjectLiteral.$metadata$ = {kind: Kind_CLASS, interfaces: [Comparator]};
  Backgrounds.prototype.iterator = function () {
    return sortedWith(this.backgrounds.values, new Comparator$ObjectLiteral(compareBy$lambda(Backgrounds$iterator$lambda))).iterator();
  };
  Backgrounds.prototype.get_61zpoe$ = function (name) {
    return this.backgrounds.get_11rb$(name);
  };
  Backgrounds.prototype.set_d76ih0$ = function (name, background) {
    this.backgrounds.put_xwzc9p$(name, background);
  };
  Backgrounds.prototype.remove_61zpoe$ = function (name) {
    this.backgrounds.remove_11rb$(name);
  };
  Backgrounds.prototype.clear = function () {
    this.backgrounds.clear();
  };
  Backgrounds.prototype.containsKey_61zpoe$ = function (name) {
    return this.backgrounds.containsKey_11rb$(name);
  };
  Backgrounds.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Backgrounds',
    interfaces: [Iterable]
  };
  var canvas;
  var options;
  var now;
  var dt;
  var last;
  var step;
  var stateTime;
  var ctx;
  var backgrounds;
  var items;
  function get_items() {
    return items;
  }
  function set_items(value) {
    items = value;
    renderables.items = value;
  }
  var childhoodItems;
  var adulthoodItems;
  var renderables;
  function main$lambda(it) {
    onFrame(canvas);
    return Unit;
  }
  function main() {
    backgrounds.set_d76ih0$('trees', Background_init_2('img/bg_forest.png', 0, -200, 0, 0, 25.0, 0));
    backgrounds.set_d76ih0$('home1', Background_init_2('img/bg_home1.png', 0, 0, 0, 0, void 0, -1));
    generateOptions();
    window.requestAnimationFrame(main$lambda);
  }
  var lifeState;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  function generateOptions() {
    var generatedOptions = ArrayList_init();
    switch (lifeState) {
      case 0:
        if (generateChildhoodOptions(generatedOptions))
          return;
        break;
      case 1:
        generateAdulthoodOptions(generatedOptions);
        break;
      case 2:
        generateRevisitOptions(generatedOptions);
        break;
    }
    options_0(copyToArray(generatedOptions).slice());
  }
  var bedLevel;
  var booksLevel;
  var fluffyToyLevel;
  var pillowsLevel;
  var blocksLevel;
  var dressUpLevel;
  var computerLevel;
  var posters;
  function generateChildhoodOptions$lambda() {
    get_items().set_wlsyda$('cot', item('img/cot.png', 112, 52, 2));
    bedLevel = 1;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_0() {
    var tmp$;
    (tmp$ = get_items().get_61zpoe$('cot')) != null ? (tmp$.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('cot_sidedown', item('img/cot_sidedown.png', 112, 52, 2));
    bedLevel = 2;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_1() {
    var tmp$;
    (tmp$ = get_items().get_61zpoe$('cot_sidedown')) != null ? (tmp$.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('bed', item('img/bed.png', 112, 52, 2));
    bedLevel = 3;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_2() {
    get_items().set_wlsyda$('bookshelf_1', item('img/bookshelf_1.png', 636, 40, 1));
    booksLevel = 1;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_3() {
    var tmp$;
    (tmp$ = get_items().get_61zpoe$('bookshelf_1')) != null ? (tmp$.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('bookshelf_2', item('img/bookshelf_2.png', 636, 40, 1));
    booksLevel = 2;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_4() {
    var tmp$;
    (tmp$ = get_items().get_61zpoe$('bookshelf_2')) != null ? (tmp$.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('bookshelf_2', item('img/bookshelf_3.png', 636, 40, 1));
    booksLevel = 3;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_5() {
    var tmp$;
    (tmp$ = get_items().get_61zpoe$('bookshelf_2')) != null ? (tmp$.fadeOut(), Unit) : null;
    booksLevel = 4;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_6() {
    get_items().set_wlsyda$('fluffytoy1', item('img/fluffytoy1.png', 99, 248, -1));
    fluffyToyLevel = 1;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_7() {
    var tmp$;
    (tmp$ = get_items().get_61zpoe$('fluffytoy1')) != null ? (tmp$.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('fluffytoy2', item('img/fluffytoy2.png', 99, 248, -1));
    fluffyToyLevel = 2;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_8() {
    var tmp$;
    (tmp$ = get_items().get_61zpoe$('fluffytoy1')) != null ? (tmp$.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('fluffytoy3', item('img/fluffytoy3.png', 356, 372, -1));
    fluffyToyLevel = 3;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_9() {
    get_items().set_wlsyda$('pillows', item('img/pillows.png', 0, 0));
    pillowsLevel = 1;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_10() {
    get_items().set_wlsyda$('blocks1', item('img/blocks1.png', 406, 200, -2));
    blocksLevel = 1;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_11() {
    get_items().set_wlsyda$('blocks2', item('img/blocks2.png', 406, 200, -2));
    blocksLevel = 2;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_12() {
    var tmp$;
    (tmp$ = get_items().get_61zpoe$('blocks1')) != null ? (tmp$.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('blocks2', item('img/blocks2.png', 406, 200, -2));
    blocksLevel = 2;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_13() {
    var tmp$;
    get_items().set_wlsyda$('dress', item('img/dress.png', 434, 138, 2));
    (tmp$ = get_items().get_61zpoe$('pillows')) != null ? (tmp$.fadeOut(), Unit) : null;
    dressUpLevel = 1;
    pillowsLevel = 2;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_14() {
    get_items().set_wlsyda$('laptop', item('img/laptop.png', 523, 121, -2));
    computerLevel = 1;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_15() {
    var tmp$;
    (tmp$ = get_items().get_61zpoe$('laptop')) != null ? (tmp$.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('desktop', item('img/desktop.png', 523, 121, -2));
    computerLevel = 2;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_16() {
    var tmp$, tmp$_0;
    (tmp$ = get_items().get_61zpoe$('musicposter')) != null ? (tmp$.fadeOut(), Unit) : null;
    (tmp$_0 = get_items().get_61zpoe$('movieposter')) != null ? (tmp$_0.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('animeposter', item('img/animeposter.png', 429, 29, 3));
    posters = 1;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_17() {
    var tmp$, tmp$_0;
    (tmp$ = get_items().get_61zpoe$('animeposter')) != null ? (tmp$.fadeOut(), Unit) : null;
    (tmp$_0 = get_items().get_61zpoe$('movieposter')) != null ? (tmp$_0.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('musicposter', item('img/musicposter.png', 429, 29, 3));
    posters = 2;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_18() {
    var tmp$, tmp$_0;
    (tmp$ = get_items().get_61zpoe$('animeposter')) != null ? (tmp$.fadeOut(), Unit) : null;
    (tmp$_0 = get_items().get_61zpoe$('musicposter')) != null ? (tmp$_0.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('movieposter', item('img/movieposter.png', 429, 29, 3));
    posters = 3;
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions$lambda_19() {
    backgrounds.clear();
    backgrounds.set_d76ih0$('city', Background_init_2('img/bg_city.png', 0, -200, 0, 0, 25.0, 0));
    backgrounds.set_d76ih0$('home2', Background_init_2('img/bg_home2.png', 0, 0, 0, 0, void 0, -1));
    lifeState = 1;
    bedLevel = 4;
    set_items(adulthoodItems);
    get_items().set_wlsyda$('airbed', item('img/airbed.png', 112, 52, 2));
    get_items().set_wlsyda$('laptop', childhoodItems.get_61zpoe$('laptop'));
    get_items().set_wlsyda$('desktop', childhoodItems.get_61zpoe$('desktop'));
    generateOptions();
    return Unit;
  }
  function generateChildhoodOptions(generatedOptions) {
    switch (bedLevel) {
      case 0:
        options_0([option('You are born.', generateChildhoodOptions$lambda)]);
        return true;
      case 1:
        generatedOptions.add_11rb$(option('You learn how to climb out of your cot.', generateChildhoodOptions$lambda_0));
        break;
      case 2:
        generatedOptions.add_11rb$(option('You are ready for a bigger bed.', generateChildhoodOptions$lambda_1));
        break;
    }
    if (bedLevel > 1) {
      switch (booksLevel) {
        case 0:
          generatedOptions.add_11rb$(option('You are read your first book.', generateChildhoodOptions$lambda_2));
          break;
        case 1:
          generatedOptions.add_11rb$(option('You get more books.', generateChildhoodOptions$lambda_3));
          break;
        case 2:
          if (bedLevel > 2) {
            generatedOptions.add_11rb$(option('You become an avid reader.', generateChildhoodOptions$lambda_4));
            generatedOptions.add_11rb$(option('You stop reading.', generateChildhoodOptions$lambda_5));
          }

          break;
      }
    }
    switch (fluffyToyLevel) {
      case 0:
        generatedOptions.add_11rb$(option(bedLevel < 3 ? 'Your parents get you a fluffy toy.' : 'You get a fluffy toy.', generateChildhoodOptions$lambda_6));
        break;
      case 1:
        generatedOptions.add_11rb$(option('You build a collection of fluffy toys', generateChildhoodOptions$lambda_7));
        if (bedLevel < 3) {
          generatedOptions.add_11rb$(option('You throw your fluffy toy out of your cot.', generateChildhoodOptions$lambda_8));
        }

        break;
    }
    if (pillowsLevel === 0)
      if (bedLevel === 1) {
        generatedOptions.add_11rb$(option('You throw your pillows out of your cot.', generateChildhoodOptions$lambda_9));
      }
    switch (blocksLevel) {
      case 0:
        if (booksLevel === 2) {
          generatedOptions.add_11rb$(option('You are given blocks to play with.', generateChildhoodOptions$lambda_10));
        }
         else if (booksLevel >= 3) {
          generatedOptions.add_11rb$(option('You are given building toys.', generateChildhoodOptions$lambda_11));
        }

        break;
      case 1:
        if (booksLevel === 3) {
          generatedOptions.add_11rb$(option('You get fancier building toys.', generateChildhoodOptions$lambda_12));
        }

        break;
    }
    if (dressUpLevel === 0)
      if (pillowsLevel === 1 && bedLevel < 3) {
        generatedOptions.add_11rb$(option(bedLevel < 3 ? 'You are given cute clothes to dress up in, to learn how to be graceful.' : 'You get cute clothes.', generateChildhoodOptions$lambda_13));
      }
    if (booksLevel > 0 && blocksLevel === 2) {
      switch (computerLevel) {
        case 0:
          generatedOptions.add_11rb$(option('You get your first computer.', generateChildhoodOptions$lambda_14));
          break;
        case 1:
          generatedOptions.add_11rb$(option('You build your own computer.', generateChildhoodOptions$lambda_15));
          break;
      }
    }
    if (bedLevel > 2) {
      if (posters !== 1) {
        generatedOptions.add_11rb$(option('You put up posters of your favourite television show.', generateChildhoodOptions$lambda_16));
      }
      if (posters !== 2) {
        generatedOptions.add_11rb$(option('You put up posters of your favourite music band.', generateChildhoodOptions$lambda_17));
      }
      if (posters !== 3) {
        generatedOptions.add_11rb$(option('You put up posters of your favourite movie.', generateChildhoodOptions$lambda_18));
      }
    }
    if (computerLevel > 0) {
      generatedOptions.add_11rb$(option('You move out.', generateChildhoodOptions$lambda_19));
    }
    return false;
  }
  var artLevel;
  function generateAdulthoodOptions$lambda() {
    var tmp$;
    (tmp$ = get_items().get_61zpoe$('airbed')) != null ? (tmp$.fadeOut(), Unit) : null;
    get_items().set_wlsyda$('bed2', item('img/bed2.png', 112, 52, 2));
    bedLevel = 5;
    generateOptions();
    return Unit;
  }
  function generateAdulthoodOptions$lambda_0() {
    get_items().set_wlsyda$('desktop', item('img/desktop.png', 523, 121, -2));
    computerLevel = 2;
    generateOptions();
    return Unit;
  }
  function generateAdulthoodOptions$lambda_1() {
    get_items().set_wlsyda$('dress2', item('img/dress2.png', 434, 138, 2));
    dressUpLevel = 2;
    generateOptions();
    return Unit;
  }
  function generateAdulthoodOptions$lambda_2() {
    get_items().set_wlsyda$('art', item('img/art.png', 429, 29, 3));
    artLevel = 1;
    generateOptions();
    return Unit;
  }
  function generateAdulthoodOptions$lambda_3() {
    backgrounds.clear();
    backgrounds.set_d76ih0$('trees', Background_init_2('img/bg_forest.png', 0, -200, 0, 0, 25.0, 0));
    backgrounds.set_d76ih0$('home1', Background_init_2('img/bg_home1.png', 0, 0, 0, 0, void 0, -1));
    set_items(childhoodItems);
    lifeState = 2;
    generateOptions();
    return Unit;
  }
  function generateAdulthoodOptions(generatedOptions) {
    if (bedLevel === 4)
      generatedOptions.add_11rb$(option('You upgrade from your airbed to an actual bed.', generateAdulthoodOptions$lambda));
    if (computerLevel === 1)
      generatedOptions.add_11rb$(option('You build your own computer.', generateAdulthoodOptions$lambda_0));
    if (dressUpLevel === 1)
      generatedOptions.add_11rb$(option('You get new clothes.', generateAdulthoodOptions$lambda_1));
    if (artLevel === 0)
      generatedOptions.add_11rb$(option('You get some nice art to put up on the walls.', generateAdulthoodOptions$lambda_2));
    if (generatedOptions.isEmpty()) {
      generatedOptions.add_11rb$(option("You revisit your parents' house.", generateAdulthoodOptions$lambda_3));
    }
  }
  function generateRevisitOptions$lambda() {
    backgrounds.clear();
    get_items().clear();
    options_0([]);
    return Unit;
  }
  function generateRevisitOptions(generatedOptions) {
    generatedOptions.add_11rb$(option('You do not live here.', generateRevisitOptions$lambda));
  }
  function onFrame$lambda(closure$canvas) {
    return function (it) {
      onFrame(closure$canvas);
      return Unit;
    };
  }
  function onFrame(canvas) {
    now = window.performance.now();
    var b = (now - last) / 1000.0;
    dt += Math_0.min(1.0, b);
    while (dt > step) {
      dt -= step;
      onTick(step);
    }
    onRender(dt);
    last = now;
    window.requestAnimationFrame(onFrame$lambda(canvas));
  }
  function onTick(dt) {
    stateTime += dt;
    var tmp$;
    tmp$ = renderables.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.onTick_14dthe$(dt);
    }
  }
  function onRender(dt) {
    ctx.clearRect(0.0, 0.0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0.0, 0.0, canvas.width, canvas.height);
    var tmp$;
    tmp$ = renderables.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      ctx.save();
      element.onRender_2mh1z0$(ctx, dt);
      ctx.restore();
    }
  }
  function options_0(newOptions) {
    options.innerHTML = '';
    var tmp$;
    for (tmp$ = 0; tmp$ !== newOptions.length; ++tmp$) {
      var element = newOptions[tmp$];
      options.appendChild(element.toAnchor());
      options.appendChild(document.createElement('br'));
    }
  }
  function Item() {
    this.image = null;
    this.x = 0;
    this.y = 0;
    this.alpha = 0;
    this.fadeSpeed = 0;
    this.depth = 0;
    this.fadingIn_0 = true;
  }
  Item.prototype.onTick_14dthe$ = function (dt) {
    if (this.fadingIn_0) {
      if (this.alpha >= 1.0)
        return;
      this.alpha += dt / (1 / this.fadeSpeed);
      var b = this.alpha;
      this.alpha = Math_0.min(1.0, b);
    }
     else {
      if (this.alpha <= 0.0)
        return;
      this.alpha -= dt / (1 / this.fadeSpeed);
      var b_0 = this.alpha;
      this.alpha = Math_0.max(0.0, b_0);
    }
  };
  Item.prototype.onRender_2mh1z0$ = function (ctx, dt) {
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    if (this.image.complete && this.image.naturalHeight !== 0) {
      ctx.drawImage(this.image, 0.0, 0.0);
    }
  };
  Item.prototype.fadeOut = function () {
    this.fadingIn_0 = false;
  };
  Item.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Item',
    interfaces: [Renderable]
  };
  function Item_init(image, x, y, alpha, depth, fadeSpeed, $this) {
    if (depth === void 0)
      depth = 0;
    if (fadeSpeed === void 0)
      fadeSpeed = 0.2;
    $this = $this || Object.create(Item.prototype);
    Item.call($this);
    $this.image = image;
    $this.x = x;
    $this.y = y;
    $this.alpha = alpha;
    $this.fadeSpeed = fadeSpeed;
    $this.depth = depth;
    return $this;
  }
  function Item_init_0(image, x, y, alpha, depth, fadeSpeed, $this) {
    if (depth === void 0)
      depth = 0;
    if (fadeSpeed === void 0)
      fadeSpeed = 0.2;
    $this = $this || Object.create(Item.prototype);
    Item_init(image, x, y, alpha, depth, fadeSpeed, $this);
    return $this;
  }
  function Item_init_1(imageSource, x, y, alpha, depth, fadeSpeed, $this) {
    if (depth === void 0)
      depth = 0;
    if (fadeSpeed === void 0)
      fadeSpeed = 0.2;
    $this = $this || Object.create(Item.prototype);
    Item.call($this);
    var tmp$;
    $this.image = Kotlin.isType(tmp$ = document.createElement('img'), HTMLImageElement) ? tmp$ : throwCCE();
    $this.image.src = imageSource;
    $this.x = x;
    $this.y = y;
    $this.alpha = alpha;
    $this.fadeSpeed = fadeSpeed;
    $this.depth = depth;
    return $this;
  }
  function Item_init_2(imageSource, x, y, alpha, depth, fadeSpeed, $this) {
    if (depth === void 0)
      depth = 0;
    if (fadeSpeed === void 0)
      fadeSpeed = 0.2;
    $this = $this || Object.create(Item.prototype);
    Item_init_1(imageSource, x, y, alpha, depth, fadeSpeed, $this);
    return $this;
  }
  function item(imageSource, x, y, depth, fadeSpeed) {
    if (depth === void 0)
      depth = 0;
    if (fadeSpeed === void 0)
      fadeSpeed = 0.2;
    return Item_init_2(imageSource, x, y, 0.0, depth, fadeSpeed);
  }
  function Items() {
    this.items = LinkedHashMap_init();
  }
  function Items$iterator$lambda(item) {
    return -item.depth | 0;
  }
  var compareBy$lambda_0 = wrapFunction(function () {
    var compareValues = Kotlin.kotlin.comparisons.compareValues_s00gnj$;
    return function (closure$selector) {
      return function (a, b) {
        var selector = closure$selector;
        return compareValues(selector(a), selector(b));
      };
    };
  });
  function Comparator$ObjectLiteral_0(closure$comparison) {
    this.closure$comparison = closure$comparison;
  }
  Comparator$ObjectLiteral_0.prototype.compare = function (a, b) {
    return this.closure$comparison(a, b);
  };
  Comparator$ObjectLiteral_0.$metadata$ = {kind: Kind_CLASS, interfaces: [Comparator]};
  Items.prototype.iterator = function () {
    return sortedWith(this.items.values, new Comparator$ObjectLiteral_0(compareBy$lambda_0(Items$iterator$lambda))).iterator();
  };
  Items.prototype.get_61zpoe$ = function (name) {
    return this.items.get_11rb$(name);
  };
  Items.prototype.set_wlsyda$ = function (name, item) {
    if (item == null) {
      this.remove_61zpoe$(name);
      return;
    }
    this.items.put_xwzc9p$(name, item);
  };
  Items.prototype.remove_61zpoe$ = function (name) {
    this.items.remove_11rb$(name);
  };
  Items.prototype.clear = function () {
    this.items.clear();
  };
  Items.prototype.containsKey_61zpoe$ = function (name) {
    return this.items.containsKey_11rb$(name);
  };
  Items.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Items',
    interfaces: [Iterable]
  };
  function Option(text, onClick) {
    this.text = text;
    this.onClick = onClick;
  }
  function Option$toAnchor$lambda(this$Option) {
    return function (it) {
      this$Option.onClick();
      return Unit;
    };
  }
  Option.prototype.toAnchor = function () {
    var tmp$;
    var anchor = Kotlin.isType(tmp$ = document.createElement('a'), HTMLAnchorElement) ? tmp$ : throwCCE();
    anchor.onclick = Option$toAnchor$lambda(this);
    anchor.href = '#';
    anchor.text = this.text;
    return anchor;
  };
  Option.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Option',
    interfaces: []
  };
  function option(text, onClick) {
    return new Option(text, onClick);
  }
  function Renderable() {
  }
  Renderable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Renderable',
    interfaces: []
  };
  function Renderables(backgrounds, items) {
    this.backgrounds = backgrounds;
    this.items = items;
  }
  Renderables.prototype.iterator = function () {
    return listOf(copyToArray(toList(this.backgrounds)).concat(copyToArray(toList(this.items)))).iterator();
  };
  Renderables.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Renderables',
    interfaces: [Iterable]
  };
  _.Background_init_pq5c4r$ = Background_init;
  _.Background_init_6oyaz1$ = Background_init_0;
  _.Background_init_cq46oa$ = Background_init_1;
  _.Background_init_qdkcua$ = Background_init_2;
  _.Background = Background;
  _.Backgrounds = Backgrounds;
  Object.defineProperty(_, 'canvas', {
    get: function () {
      return canvas;
    }
  });
  Object.defineProperty(_, 'options', {
    get: function () {
      return options;
    }
  });
  Object.defineProperty(_, 'now', {
    get: function () {
      return now;
    },
    set: function (value) {
      now = value;
    }
  });
  Object.defineProperty(_, 'dt', {
    get: function () {
      return dt;
    },
    set: function (value) {
      dt = value;
    }
  });
  Object.defineProperty(_, 'last', {
    get: function () {
      return last;
    },
    set: function (value) {
      last = value;
    }
  });
  Object.defineProperty(_, 'step', {
    get: function () {
      return step;
    },
    set: function (value) {
      step = value;
    }
  });
  Object.defineProperty(_, 'stateTime', {
    get: function () {
      return stateTime;
    },
    set: function (value) {
      stateTime = value;
    }
  });
  Object.defineProperty(_, 'ctx', {
    get: function () {
      return ctx;
    }
  });
  Object.defineProperty(_, 'backgrounds', {
    get: function () {
      return backgrounds;
    }
  });
  Object.defineProperty(_, 'items', {
    get: get_items,
    set: set_items
  });
  Object.defineProperty(_, 'childhoodItems', {
    get: function () {
      return childhoodItems;
    },
    set: function (value) {
      childhoodItems = value;
    }
  });
  Object.defineProperty(_, 'adulthoodItems', {
    get: function () {
      return adulthoodItems;
    },
    set: function (value) {
      adulthoodItems = value;
    }
  });
  Object.defineProperty(_, 'renderables', {
    get: function () {
      return renderables;
    }
  });
  _.main = main;
  Object.defineProperty(_, 'lifeState', {
    get: function () {
      return lifeState;
    },
    set: function (value) {
      lifeState = value;
    }
  });
  _.generateOptions = generateOptions;
  Object.defineProperty(_, 'bedLevel', {
    get: function () {
      return bedLevel;
    },
    set: function (value) {
      bedLevel = value;
    }
  });
  Object.defineProperty(_, 'booksLevel', {
    get: function () {
      return booksLevel;
    },
    set: function (value) {
      booksLevel = value;
    }
  });
  Object.defineProperty(_, 'fluffyToyLevel', {
    get: function () {
      return fluffyToyLevel;
    },
    set: function (value) {
      fluffyToyLevel = value;
    }
  });
  Object.defineProperty(_, 'pillowsLevel', {
    get: function () {
      return pillowsLevel;
    },
    set: function (value) {
      pillowsLevel = value;
    }
  });
  Object.defineProperty(_, 'blocksLevel', {
    get: function () {
      return blocksLevel;
    },
    set: function (value) {
      blocksLevel = value;
    }
  });
  Object.defineProperty(_, 'dressUpLevel', {
    get: function () {
      return dressUpLevel;
    },
    set: function (value) {
      dressUpLevel = value;
    }
  });
  Object.defineProperty(_, 'computerLevel', {
    get: function () {
      return computerLevel;
    },
    set: function (value) {
      computerLevel = value;
    }
  });
  Object.defineProperty(_, 'posters', {
    get: function () {
      return posters;
    },
    set: function (value) {
      posters = value;
    }
  });
  Object.defineProperty(_, 'artLevel', {
    get: function () {
      return artLevel;
    },
    set: function (value) {
      artLevel = value;
    }
  });
  _.onFrame_ap7jt0$ = onFrame;
  _.onTick_14dthe$ = onTick;
  _.onRender_14dthe$ = onRender;
  _.options_esisg4$ = options_0;
  _.Item_init_2hfglo$ = Item_init;
  _.Item_init_9qki1k$ = Item_init_0;
  _.Item_init_3aobdt$ = Item_init_1;
  _.Item_init_oh5b25$ = Item_init_2;
  _.Item = Item;
  _.item_l3bs2z$ = item;
  _.Items = Items;
  _.Option = Option;
  _.option_a4mwiz$ = option;
  _.Renderable = Renderable;
  _.Renderables = Renderables;
  var tmp$, tmp$_0, tmp$_1;
  canvas = Kotlin.isType(tmp$ = document.getElementById('game_canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
  options = Kotlin.isType(tmp$_0 = document.getElementById('options'), HTMLDivElement) ? tmp$_0 : throwCCE();
  now = window.performance.now();
  dt = 0.0;
  last = window.performance.now();
  step = 1 / 60.0;
  stateTime = 0.0;
  ctx = Kotlin.isType(tmp$_1 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_1 : throwCCE();
  backgrounds = new Backgrounds();
  items = new Items();
  childhoodItems = get_items();
  adulthoodItems = new Items();
  renderables = new Renderables(backgrounds, get_items());
  lifeState = 0;
  bedLevel = 0;
  booksLevel = 0;
  fluffyToyLevel = 0;
  pillowsLevel = 0;
  blocksLevel = 0;
  dressUpLevel = 0;
  computerLevel = 0;
  posters = 0;
  artLevel = 0;
  main();
  Kotlin.defineModule('where-home-is', _);
  return _;
}(typeof this['where-home-is'] === 'undefined' ? {} : this['where-home-is'], kotlin);
