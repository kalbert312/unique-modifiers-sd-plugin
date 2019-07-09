source ./build.sh
plugin_name="com.github.kalbert312.unique-modifiers"
killall "Stream Deck"
rm -rf ~/Library/Application\ Support/com.elgato.StreamDeck/Plugins/${plugin_name}.sdPlugin
open -a "Stream Deck" ./Release/${plugin_name}.streamDeckPlugin
