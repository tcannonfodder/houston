guard 'nanoc' do
  watch('nanoc.yaml') # Change this to config.yaml if you use the old config file name
  watch('Rules')
  watch(%r{^(content|layouts|lib|static)/.*$})
end

guard 'livereload', :apply_js_live => false, :grace_period => 0 do
  ext = %w[js css png gif html md markdown xml]

  watch(%r{^public(/[^/]+\.(?:#{ext.join('|')}))$}) do |match|
    match[1].sub(/\/index\.html$/, '/')
  end
end