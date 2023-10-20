1. Unify local development environments
2. Sort episodes by release date
	1. Add release date to newly added episodes
	2. Build UI for sorting episodes (newest/oldest toggle)
	3. Add release date to existing episodes (modify add podcast to add new or update existing)
3. Manually pull new episodes from RSS
	1. Add button on podcast details page
	2. On navigate to podcast details, check if it's been an hour since the last refresh

If time permits...
4. Fix mini player sizing
5. Show loading indicator when adding a podcast by RSS


## Add in APOC (Awesome Procedures On Cypher)
With the neo4j-graphql library, it needs this additional library called APOC. Since I'm using docker it should be a breeze to set up and just need to modify the startup procedure for the neo4j container.

`docker run \ -p 7474:7474 -p 7687:7687 \ --name castify-neo4j \ -e NEO4J_apoc_export_file_enabled=true \ -e NEO4J_apoc_import_file_enabled=true \ -e NEO4J_apoc_import_file_use__neo4j__config=true \ -e NEO4J_PLUGINS=\[\"apoc\"\] \ neo4j`
