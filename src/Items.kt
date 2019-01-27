class Items: Iterable<Item> {

    val items = mutableMapOf<String, Item>()

    override fun iterator(): Iterator<Item> {
        return items.values.sortedBy { item -> -item.depth }.iterator()
    }

    operator fun get(name: String): Item? {
        return items[name]
    }

    operator fun set(name: String, item: Item?) {
        if (item == null) {
            remove(name)
            return
        }
        items[name] = item
    }

    fun remove(name: String) {
        items.remove(name)
    }

    fun clear() {
        items.clear()
    }

    fun containsKey(name: String): Boolean {
        return items.containsKey(name)
    }

}