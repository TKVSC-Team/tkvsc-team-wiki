# Tutorial still in development!

# Making Your First Mod - Simple Attribute Edit

I've been creating mods for Tears of the Kingdom (**TOTK**) since it first launched in 2023. In the TOTK Modding Hub Discord server, new users will often ask for recommendations on what makes a good first project. My response is always that they should either make a basic texture edit or a basic attribute edit. In this tutorial, I'll be walking through the steps on making a basic attribute edit using the Tears of the Kingdom Visual Studio Code extension (**TKVSC**), and how to package it for release using Tears of the Kingdom Mod Manager (**TKMM**).

## Requirements

1. Legally acquired [RomFS dump](https://gamebanana.com/tuts/19858) of TOTK
2. [Visual Studio Code](https://code.visualstudio.com/download) (VS Code)
3. [TKVSC](https://github.com/TKVSC-Team/totk-vscode/wiki/002---Setup-Guide)
4. [TKVSC TKMM-CLI Addon](https://github.com/TKVSC-Team/tkvsc-addons/releases/latest)

In this guide, we will create a mod that increases the defense of the base-level Hylian set. Using TKVSC, this will require making changes in 4 files.

If you already know the `ActorName` of the actor you want to modify, you can skip to Step 2.

## Steps

### 1. Locate the Actor

In the context of Tears of the Kingdom, pretty much everything you see ingame is, internally, an "actor". If it's been placed on the map, it's an actor. If you can interact with it, it's an actor. If it exists in your inventory, it's an actor. The first step when making an attribute change is determining which actor pack in your Game Dump contains the file that you want to change. In order to find the actor name for each item in the Hylian set, we'll reference the [Data Spreadsheet for Tears of the Kingdom](https://docs.google.com/spreadsheets/d/1fBvQ17WHP3ASgtO8ode_rf1g4DfEHErMrHwwLppNTJM/edit). Since we're modifying the attributes of armor pieces, navigate to the Armor tab. Once you locate the pieces of the Hylian set in the list, scroll to the right until you find the `ActorName` column. For the Hylian Hood, Hylian Tunic, and Hylian Trousers, the `ActorName` will be `Armor_001_Head`, `Armor_001_Upper`, and `Armor_001_Lower` respectively.\
<img src="https://raw.githubusercontent.com/TKVSC-Team/totk-vscode/refs/heads/main/docs/tutorials/mod_simpleattribute/attribute_DataSheet.png" alt="A screenshot of the TOTK Data Spreadsheet, focusing on the Armor tab with the Hylian Hood, Hylian Tunic, and Hylian Trousers visible. The ActorName column is shown as Column BB." width="70%"/>

*If you want to edit an attribute for an actor that doesn't fall into any of the specialized tabs, you can go to the tab with `MasterList` in its name for a list of every actor in the game. The first column contains the English-localized name of the actor, which is what displays ingame when the actor's name needs to appear somewhere, such as hovering over an item in the inventory.* 

### 2. Modify the Attribute

In the `Your Projects` tab of TKVSC, add or create a new Project folder, then set it as the active project. Navigate to the `Game Dump` tab, and use the `Filter Archives...` searchbar to search for the name of each actor pack. you wish to modify. Since all of the Hylian set actors have `Armor_001` at the start of their name, we can search for that, and the relevant files will appear. Actor packs are generally located in `\Pack\Actor`, the reason the `UI` folder appears is because the UI icons are treated as archives, but it isn't needed for this mod. Next, we add `Armor_001_Head.pack.zs`, `Armor_001_Upper.pack.zs`, and `Armor_001_Lower.pack.zs` to the active mod project. You don't need to add `Armor_001_Head_B.pack.zs` for reasons that will be explained later on. Additionally, in the `\RSDB` folder, add the file beginning with `PouchActorInfo`.

Head back to the `Your Projects` tab and navigate to the project you're working in. The files we added to the project should be in `romfs\Pack\Actor` within that folder, as shown below:\
<img src="https://raw.githubusercontent.com/TKVSC-Team/totk-vscode/refs/heads/main/docs/tutorials/mod_simpleattribute/attribute_ProjectFileList.png" alt="A screenshot of TKVSC's Your Projects tab focusing on the files in the sample project." width="70%"/>\
Click on the `.pack.zs` files to browse their contents. In each of them, the file we want to edit is located in `\Component\ArmorParam`. Open this file, and edit the value in the `BaseDefense` field. For the sake of making it a clear ingame difference, we'll change this value to 20. Make this change in each actor pack, and save each file:\
<img src="https://raw.githubusercontent.com/TKVSC-Team/totk-vscode/refs/heads/main/docs/tutorials/mod_simpleattribute/attribute_ArmorParamEdit.png" alt="A screenshot of TKVSC's Your Projects tab focusing on the files in the sample project." width="70%"/>\
*Due to TKVSC's Canonical Sync feature, several other actor packs will be pulled into your mod project when you save the files. This is normal, and is something TKVSC does automatically to save you time by preventing the need to edit the same file multiple times when their contents are identical in the vanilla game.*

In Tears of the Kingdom, the functional value of equipment (armors, weapons, shields, and bows) is separate from the label, so it's important to update the displayed value to clearly communicate to those using your mod what changes it makes. The labelled value is located in the `PouchActorInfo` file that we added to the mod project in Step 1.

Navigate to the `PouchActorInfo` file in your project folder, and search for the actor name of each of the 3 actors you copied in before. The field you'll want to edit here is `EquipmentPerformance`, which determines the number shown in the inventory when hovering over an item. Without changing thie value, the armor pieces would still each have 20 defense, but they would be labelled as having 3 defense.\
<img src="https://raw.githubusercontent.com/TKVSC-Team/totk-vscode/refs/heads/main/docs/tutorials/mod_simpleattribute/attribute_RSDB.png" alt="A screenshot of TKVSC's Your Projects tab focusing on the files in the sample project." width="70%"/>

In `PouchActorInfo`, for the Hylian Hood mod that we're making, you'll also want to edit the `EquipmentPerformance` value for the actor `Armor_1152_Head`, which is the actor name for the unupgraded hood-down variant of the Hylian Hood. It's the only armor piece in the game that can be lowered or raised, so it's a special case in that regard.

### 3. Package Mod for Distribution
Click on the `.tkproj` file in your Project folder and fill in the fields with the relevant information on your mod. For a detailed explanation on the purpose of each field, please see the [TKMM Wiki](https://tkmm.org/docs/creating-mods/#basic-fields). Once you've configured the `.tkproj` file, right click it in the Your Projects tab and choose `Package as TKCL`. Now you can share it however you'd like. Remember, in order to upload a `.tkcl` file on GameBanana, you have to put it inside of an archive first (`.zip`, `.7z`, `.rar`, etc).