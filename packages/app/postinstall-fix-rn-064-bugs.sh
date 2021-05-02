#!/bin/bash

OS=`uname`

echo "Fixing RN 0.64.0 bugs:"
cd node_modules/react-native/scripts
echo "- unset PREFIX in find-node.sh"
if [ `cat find-node.sh | grep 'unset PREFIX' | wc -l` -lt 1 ]
then
  cp find-node.sh tmp
  head -n 1 tmp >find-node.sh
  echo "unset PREFIX" >>find-node.sh
  tail -n +2 tmp >>find-node.sh
  rm tmp
fi

if [ "$OS" = 'Darwin' ]
then
  # for MacOS; cannot install Pods on Win/Linux
  echo "- switch to relative paths in react_native_pods.rb "
  sed -i '' -e "s/File[.]join[(]__dir__, \"[.][.]\"[)]/\"..\/..\/node_modules\/react-native\"/" react_native_pods.rb
  sed -i '' -e "s/#{File[.]join[(]__dir__, \"generate-specs.sh\"[)]}/..\/..\/node_modules\/react-native\/scripts\/generate-specs.sh/" react_native_pods.rb
  sed -i '' -e "s/spec[.]prepare_command = \"#/spec.prepare_command = \"cd ..\/.. \&\& #/" react_native_pods.rb
fi

cd - >/dev/null