require 'yaml'
require 'erb'
require 'byebug'

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

  def self.compress_assets!
    @@config["compress_assets"] = true
  end

  def self.production?
    @@config["environment"] == "production"
  end

  def self.has_javascript_sourcetree?(name)
    javascript_sourcetrees.has_key?(name)
  end

  def self.include_javascripts(name)
    name = name.to_s
    raise ArgumentError, "no sourcetree for #{name}" unless has_javascript_sourcetree?(name)

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

  def self.compressor_options
    {:comments => :none}
  end

  def self.compile_javascript_set(name)
    raise ArgumentError, "no sourcetree for #{name}" unless javascript_sourcetrees.has_key?(name)
    source_files = javascript_sourcetrees[name].flatten.uniq

    return if name == "asset_bundles"
    if production?
      FileUtils.mkdir_p(@@config["destination_path"])

      if compress_assets?
        files_to_compress = source_files.flatten.join(' ')
        output_file = File.join(@@config["destination_path"], "#{name}.js")
        command = "time uglifyjs --screw-ie8 --no-copyright"
        cmd = "#{command} #{files_to_compress} -o #{output_file}"

        puts cmd
        puts `#{cmd}`
      else
        puts "concating #{name}"
        uncompressed_filename = File.join(@@config["destination_path"], "#{name}.js")

        js = concatenate(source_files)
        filename = File.join(@@config["destination_path"], "#{name}.js")
        File.write(filename, js)
      end
    else
      puts @@config["destination_path"]
      FileUtils.mkdir_p(@@config["destination_path"])
      FileUtils.cp source_files, @@config["destination_path"]
    end
  end

  # Concatenate together a list of asset files.
  def self.concatenate(paths)
    [paths].flatten.map {|p| read_binary_file(p) }.join("\n")
  end

  # `File.read`, but in "binary" mode.
  def self.read_binary_file(path)
    File.open(path, 'rb:UTF-8') {|f| f.read }
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

  def self.compress_assets?
    @@config["compress_assets"]
  end
end