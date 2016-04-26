require 'yaml'
require 'erb'

module AssetCompiler
  def self.load_config(config_file, options = {})
    options = {
      "source_path" => 'static/',
      "destination_path" => "assets/",
      "compiled_path" => "assets/",
      "link_prefix" => "../",
      "environment" => "development",
    }.merge(options )
    @@config = YAML.load(ERB.new(File.read(config_file)).result).merge(options)
  end

  def self.production?
    @@config["environment"] == "production"
  end

  def self.include_javascripts(name)
    name = name.to_s
    raise ArgumentError, "no sourcetree for #{name}" unless javascript_sourcetrees.has_key?(name)

    if production?
      javascript_include(path_for_name("#{name}.js"))
    else
      javascript_sourcetrees[name].map do |file|
        javascript_include(path_for_name(file.gsub(@@config["source_path"], '')))
      end.join("\n")
    end
  end

  def self.path_for_name(name)
    "#{@@config["link_prefix"]}#{@@config["compiled_path"]}#{name}"
  end

  def self.javascript_include(path)
    "<script src=\"#{path}\"></script>"
  end

  def self.compile_javascript_set(name)
    raise ArgumentError, "no sourcetree for #{name}" unless javascript_sourcetrees.has_key?(name)

    if production?
      FileUtils.mkdir_p(@@config["destination_path"])
      # file = File.new()

      puts "concating..."
      uncompressed_filename = File.join(@@config["destination_path"], "#{name}.js")
      # Concatenate new file based on old assets
      `cat #{javascript_sourcetrees[name].join(' ')} > #{File.join(@@config["destination_path"], "#{name}.js")}`

      # puts "compressing"
      # compressed_filename = File.join(@@config["destination_path"], "#{name}.js")
      # compressed_file_contents = File.write(::Uglifier.compile(File.read(uncompressed_filename)), compressed_filename)
      # puts "done compressing"

      # File.write(File.join(@@config["destination_path"], "#{name}.js"), compressed_file_contents)

      # javascript_sourcetrees[name].each do |file_path|
      #   begin
      #     file_contents = ::YUI::JavaScriptCompressor.new.compress()
      #   rescue YUI::Compressor::RuntimeError => e
      #     puts "compilation error on #{file_path}"
      #     raise e
      #     file_contents = File.read(file_path)
      #   end

      #   file << file_contents
      # end

      # file.close
    else
      puts @@config["destination_path"]
      FileUtils.mkdir_p(@@config["destination_path"])
      FileUtils.cp javascript_sourcetrees[name], @@config["destination_path"]
    end
  end

  def self.compile_javascript
    javascript_sourcetrees.keys.each{|name| compile_javascript_set(name) }
  end

  def self.javascript_sourcetrees
    @@config["javascripts"]
  end

  def self.stylesheets_sourcetrees
    @@config["javascripts"]
  end
end