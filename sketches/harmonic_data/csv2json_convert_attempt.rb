require 'csv'
require 'json'

# csv_string = CSV.generate do |csv|
#   JSON.parse(File.open("foo.json").read).each do |hash|
#     csv << hash.values
#   end
# end

 # CSV.parse(File.open("01_-_I_Saw_Her_Standing_There.csv").read).to_json
 CSV.parse("abc,efg,123").to_json