#!/bin/zsh
eval pwd

scripts=(
  '@weedle-app/app prepare'
  '@weedle-app/auth prepare'
)

for script in "${scripts[@]}"
do
  printf '\n=========> %s <=========\n' "yarn workspace $script"
  eval 'yarn workspace ' $script
done