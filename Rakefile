# Adapted from Github's API documentation Deployment Rakefile
# https://github.com/github/developer.github.com/blob/master/Rakefile
require 'nanoc3/tasks'
require 'tmpdir'
require 'rake'

task :default => [:compile]

desc "Compile the site"
task :compile do
  puts `COMPRESS_ASSETS=true nanoc compile`
end

desc "Clean any compiled assets"
task :clean do
  puts `rm -R public/ houston/`
end

desc "Test the output"
task :test => [:clean, :compile] do
  require 'html/proofer'
  HTML::Proofer.new("./public").run
end

desc "Build a release version"
task :release => [:clean, :compile] do
  puts `cp -R public/ houston/`
end