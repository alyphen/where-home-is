class Renderables(val backgrounds: Backgrounds, var items: Items): Iterable<Renderable> {
    override fun iterator(): Iterator<Renderable> {
        return listOf(*backgrounds.toList().toTypedArray(), *items.toList().toTypedArray()).iterator()
    }
}