# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::Tagging
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::LinkTo

AssetCompiler.load_config(
  File.expand_path(File.join(File.dirname(__FILE__), "../config/assets.yml")),
  "destination_path" => File.expand_path(File.join(File.dirname(__FILE__), "../public/assets")),
  "environment" => "production"
)

if ENV['COMPRESS_ASSETS']
  AssetCompiler.compress_assets!
end

def include_javascripts(name)
  AssetCompiler.include_javascripts(name)
end

def has_javascript_sourcetree?(name)
  AssetCompiler.has_javascript_sourcetree?(name)
end

AssetCompiler.compile_javascript

def current_page?(item, filename)
  return if filename.nil?
  item[:filename].end_with?("#{filename}.html")
end