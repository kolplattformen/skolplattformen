

def find_and_replace(dir, findstr, replacestr)
    Dir[dir].each do |name|
      puts "Working on: " + name
        text = File.read(name)
        replace = text.gsub(findstr,replacestr)
        replaced = text.index(replacestr)
        if replaced == nil && text != replace
            puts "Fix: " + name
            system('chmod +rw ' + name)
            File.open(name, "w") { |file| file.puts replace }
            STDOUT.flush
        else
            puts "Already fixed:" + name
        end
    end
    Dir[dir + '*/'].each(&method(:find_and_replace))
  end

find_and_replace("Pods/Flipper-Folly/folly/synchronization/DistributedMutex-inl.h",
    "atomic_notify_one(state)", 
    "folly::atomic_notify_one(state)")

find_and_replace("Pods/Flipper-Folly/folly/synchronization/DistributedMutex-inl.h",
    "atomic_wait_until(&state, previous | data, deadline)", 
    "folly::atomic_wait_until(&state, previous | data, deadline)")

find_and_replace("Pods/RCT-Folly/folly/synchronization/DistributedMutex-inl.h",
    "atomic_notify_one(state)", "folly::atomic_notify_one(state)")