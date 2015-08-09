# Adapted from Github's API documentation Deployment Rakefile
# https://github.com/github/developer.github.com/blob/master/Rakefile
require 'nanoc3/tasks'
require 'tmpdir'
require 'rake'

task :default => [:compile]

desc "Compile the site"
task :compile do
  puts `nanoc compile`
end

desc "Test the output"
task :test => [:clean, :remove_output_dir, :compile] do
  require 'html/proofer'
  HTML::Proofer.new("./public").run
end