require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-svga-player"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-svga-player
                   DESC
  s.homepage     = "https://github.com/bang88/react-native-svga-player"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "bang88" => "sqibang@email.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/bang88/react-native-svga-player.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  # ...
	s.dependency "SVGAPlayer"

end

