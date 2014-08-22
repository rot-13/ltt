Refactor:
* Use proper templates for Playlist row.
* Separate index.haml into partials, make Grunt only compile index.haml.

Grunt:
* Add post-deploy script to Heroku (`grunt`) - Maybe requires an express app instead of Rack.
* Add grunt-contrib-clean to remove the `tmp` folder after compile.

Bugs:
* Safari overflow doesn't work.

