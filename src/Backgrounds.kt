class Backgrounds: Iterable<Background> {

    val backgrounds = mutableMapOf<String, Background>()

    override fun iterator(): Iterator<Background> {
        return backgrounds.values.sortedBy { bg -> -bg.depth }.iterator()
    }

    operator fun get(name: String): Background? {
        return backgrounds[name]
    }

    operator fun set(name: String, background: Background) {
        backgrounds[name] = background
    }

    fun remove(name: String) {
        backgrounds.remove(name)
    }

    fun clear() {
        backgrounds.clear()
    }

    fun containsKey(name: String): Boolean {
        return backgrounds.containsKey(name)
    }

}