
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLDivElement
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.min

val canvas: HTMLCanvasElement = document.getElementById("game_canvas") as HTMLCanvasElement
val options: HTMLDivElement = document.getElementById("options") as HTMLDivElement

var now = window.performance.now()
var dt = 0.0
var last = window.performance.now()
var step = 1 / 60.0

var stateTime = 0.0

val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

val backgrounds = Backgrounds()
var items = Items()
    set(value) {
        field = value
        renderables.items = value
    }
var childhoodItems = items
var adulthoodItems = Items()
val renderables = Renderables(backgrounds, items)

fun main() {
    backgrounds["trees"] = Background("img/bg_forest.png", 0, -200, 0, 0, speed = 25.0, depth = 0)
    backgrounds["home1"] = Background("img/bg_home1.png", 0, 0, 0, 0, depth = -1)

    generateOptions()

    window.requestAnimationFrame { onFrame(canvas) }
}

var lifeState = 0 // 0 = childhood, 1 = adulthood, 2 = adulthood visiting childhood room

fun generateOptions() {
    val generatedOptions = mutableListOf<Option>()
    when (lifeState) {
        0 -> if (generateChildhoodOptions(generatedOptions)) return
        1 -> generateAdulthoodOptions(generatedOptions)
        2 -> generateRevisitOptions(generatedOptions)
    }

    options(*generatedOptions.toTypedArray())
}

var bedLevel = 0 // 0 = no bed, 1 = cot, 2 = cot with side down, 3 = bed, 4 = airbed, 5 = bed
var booksLevel = 0 // 0 = no books, 1 = 1 book, 2 = small bookcase, 3 = large bookcase, 4 = books gone
var fluffyToyLevel = 0 // 0 = no fluffy toy, 1 = 1 fluffy toy, 2 = many fluffy toy, 3 = thrown fluffy toy
var pillowsLevel = 0 // 0 = no pillow, 1 = thrown pillow, 2 = tidy
var blocksLevel = 0 // 0 = no blocks, 1 = childish block tower, 2 = lego castle
var dressUpLevel = 0 // 0 = no dress up, 1 = dress up, 2 = dress
var computerLevel = 0 // 0 = no computer, 1 = laptop, 2 = desktop
var posters = 0 // 0 = no posters, 1 = anime posters, 2 = music posters, 3 = movie posters

private fun generateChildhoodOptions(generatedOptions: MutableList<Option>): Boolean {
    when (bedLevel) {
        0 -> {
            options(
                    option("You are born.") {
                        items["cot"] = item("img/cot.png", 112, 52, 2)
                        bedLevel = 1
                        generateOptions()
                    }
            )
            return true
        }
        1 -> {
            generatedOptions.add(option("You learn how to climb out of your cot.") {
                items["cot"]?.fadeOut()
                items["cot_sidedown"] = item("img/cot_sidedown.png", 112, 52, 2)
                bedLevel = 2
                generateOptions()
            })
        }
        2 -> {
            generatedOptions.add(option("You are ready for a bigger bed.") {
                items["cot_sidedown"]?.fadeOut()
                items["bed"] = item("img/bed.png", 112, 52, 2)
                bedLevel = 3
                generateOptions()
            })
        }
    }
    if (bedLevel > 1) {
        when (booksLevel) {
            0 -> {
                generatedOptions.add(option("You are read your first book.") {
                    items["bookshelf_1"] = item("img/bookshelf_1.png", 636, 40, 1)
                    booksLevel = 1
                    generateOptions()
                })
            }
            1 -> {
                generatedOptions.add(option("You get more books.") {
                    items["bookshelf_1"]?.fadeOut()
                    items["bookshelf_2"] = item("img/bookshelf_2.png", 636, 40, 1)
                    booksLevel = 2
                    generateOptions()
                })
            }
            2 -> {
                if (bedLevel > 2) {
                    generatedOptions.add(option("You become an avid reader.") {
                        items["bookshelf_2"]?.fadeOut()
                        items["bookshelf_2"] = item("img/bookshelf_3.png", 636, 40, 1)
                        booksLevel = 3
                        generateOptions()
                    })
                    generatedOptions.add(option("You stop reading.") {
                        items["bookshelf_2"]?.fadeOut()
                        booksLevel = 4
                        generateOptions()
                    })
                }
            }
        }
    }
    when (fluffyToyLevel) {
        0 -> {
            generatedOptions.add(option(if (bedLevel < 3) "Your parents get you a fluffy toy." else "You get a fluffy toy.") {
                items["fluffytoy1"] = item("img/fluffytoy1.png", 99, 248, -1)
                fluffyToyLevel = 1
                generateOptions()
            })
        }
        1 -> {
            generatedOptions.add(option("You build a collection of fluffy toys") {
                items["fluffytoy1"]?.fadeOut()
                items["fluffytoy2"] = item("img/fluffytoy2.png", 99, 248, -1)
                fluffyToyLevel = 2
                generateOptions()
            })
            if (bedLevel < 3) {
                generatedOptions.add(option("You throw your fluffy toy out of your cot.") {
                    items["fluffytoy1"]?.fadeOut()
                    items["fluffytoy3"] = item("img/fluffytoy3.png", 356, 372, -1)
                    fluffyToyLevel = 3
                    generateOptions()
                })
            }
        }
    }
    when (pillowsLevel) {
        0 -> {
            if (bedLevel == 1) {
                generatedOptions.add(option("You throw your pillows out of your cot.") {
                    items["pillows"] = item("img/pillows.png", 0, 0)
                    pillowsLevel = 1
                    generateOptions()
                })
            }
        }
    }
    when (blocksLevel) {
        0 -> {
            if (booksLevel == 2) {
                generatedOptions.add(option("You are given blocks to play with.") {
                    items["blocks1"] = item("img/blocks1.png", 406, 200, -2)
                    blocksLevel = 1
                    generateOptions()
                })
            } else if (booksLevel >= 3) {
                generatedOptions.add(option("You are given building toys.") {
                    items["blocks2"] = item("img/blocks2.png", 406, 200, -2)
                    blocksLevel = 2
                    generateOptions()
                })
            }
        }
        1 -> {
            if (booksLevel == 3) {
                generatedOptions.add(option("You get fancier building toys.") {
                    items["blocks1"]?.fadeOut()
                    items["blocks2"] = item("img/blocks2.png", 406, 200, -2)
                    blocksLevel = 2
                    generateOptions()
                })
            }
        }
    }
    when (dressUpLevel) {
        0 -> {
            if (pillowsLevel == 1 && bedLevel < 3) {
                generatedOptions.add(option(if (bedLevel < 3) "You are given cute clothes to dress up in, to learn how to be graceful." else "You get cute clothes.") {
                    items["dress"] = item("img/dress.png", 434, 138, 2)
                    items["pillows"]?.fadeOut()
                    dressUpLevel = 1
                    pillowsLevel = 2
                    generateOptions()
                })
            }
        }
    }
    if (booksLevel > 0 && blocksLevel == 2) {
        when (computerLevel) {
            0 -> {
                generatedOptions.add(option("You get your first computer.") {
                    items["laptop"] = item("img/laptop.png", 523, 121, -2)
                    computerLevel = 1
                    generateOptions()
                })
            }
            1 -> {
                generatedOptions.add(option("You build your own computer.") {
                    items["laptop"]?.fadeOut()
                    items["desktop"] = item("img/desktop.png", 523, 121, -2)
                    computerLevel = 2
                    generateOptions()
                })
            }
        }
    }
    if (bedLevel > 2) {
        if (posters != 1) {
            generatedOptions.add(option("You put up posters of your favourite television show.") {
                items["musicposter"]?.fadeOut()
                items["movieposter"]?.fadeOut()
                items["animeposter"] = item("img/animeposter.png", 429, 29, 3)
                posters = 1
                generateOptions()
            })
        }
        if (posters != 2) {
            generatedOptions.add(option("You put up posters of your favourite music band.") {
                items["animeposter"]?.fadeOut()
                items["movieposter"]?.fadeOut()
                items["musicposter"] = item("img/musicposter.png", 429, 29, 3)
                posters = 2
                generateOptions()
            })
        }
        if (posters != 3) {
            generatedOptions.add(option("You put up posters of your favourite movie.") {
                items["animeposter"]?.fadeOut()
                items["musicposter"]?.fadeOut()
                items["movieposter"] = item("img/movieposter.png", 429, 29, 3)
                posters = 3
                generateOptions()
            })
        }
    }
    if (computerLevel > 0) {
        generatedOptions.add(option("You move out.") {
            backgrounds.clear()
            backgrounds["city"] = Background("img/bg_city.png", 0, -200, 0, 0, speed = 25.0, depth = 0)
            backgrounds["home2"] = Background("img/bg_home2.png", 0, 0, 0, 0, depth = -1)
            lifeState = 1
            bedLevel = 4
            items = adulthoodItems
            items["airbed"] = item("img/airbed.png", 112, 52, 2)
            items["laptop"] = childhoodItems["laptop"]
            items["desktop"] = childhoodItems["desktop"]
            generateOptions()
        })
    }
    return false
}

var artLevel = 0 // 0 = no art, 1 = art

private fun generateAdulthoodOptions(generatedOptions: MutableList<Option>) {
    when (bedLevel) {
        4 -> {
            generatedOptions.add(option("You upgrade from your airbed to an actual bed.") {
                items["airbed"]?.fadeOut()
                items["bed2"] = item("img/bed2.png", 112, 52, 2)
                bedLevel = 5
                generateOptions()
            })
        }
    }
    when (computerLevel) {
        1 -> {
            generatedOptions.add(option("You build your own computer.") {
                items["desktop"] = item("img/desktop.png", 523, 121, -2)
                computerLevel = 2
                generateOptions()
            })
        }
    }
    when (dressUpLevel) {
        1 -> {
            generatedOptions.add(option("You get new clothes.") {
                items["dress2"] = item("img/dress2.png", 434, 138, 2)
                dressUpLevel = 2
                generateOptions()
            })
        }
    }
    when (artLevel) {
        0 -> {
            generatedOptions.add(option("You get some nice art to put up on the walls.") {
                items["art"] = item("img/art.png", 429, 29, 3)
                artLevel = 1
                generateOptions()
            })
        }
    }
    if (generatedOptions.isEmpty()) {
        generatedOptions.add(option("You revisit your parents' house.") {
            backgrounds.clear()
            backgrounds["trees"] = Background("img/bg_forest.png", 0, -200, 0, 0, speed = 25.0, depth = 0)
            backgrounds["home1"] = Background("img/bg_home1.png", 0, 0, 0, 0, depth = -1)
            items = childhoodItems
            lifeState = 2
            generateOptions()
        })
    }
}

private fun generateRevisitOptions(generatedOptions: MutableList<Option>) {
    generatedOptions.add(option("You do not live here.") {
        backgrounds.clear()
        items.clear()
        options()
    })
}

fun onFrame(canvas: HTMLCanvasElement) {
    now = window.performance.now()
    dt += min(1.0, (now - last) / 1000.0)
    while (dt > step) {
        dt -= step
        onTick(step)
    }
    onRender(dt)
    last = now
    window.requestAnimationFrame { onFrame(canvas) }
}

fun onTick(dt: Double) {
    stateTime += dt
    renderables.forEach { renderable ->
        renderable.onTick(dt)
    }
}

fun onRender(dt: Double) {
    ctx.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
    ctx.fillStyle = "rgb(0, 0, 0)"
    ctx.fillRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
    renderables.forEach { renderable ->
        ctx.save()
        renderable.onRender(ctx, dt)
        ctx.restore()
    }
}

fun options(vararg newOptions: Option) {
    options.innerHTML = ""
    newOptions.forEach { option ->
        options.appendChild(option.toAnchor())
        options.appendChild(document.createElement("br"))
    }
}