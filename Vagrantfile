# -*- mode: ruby -*-
# vim:set ft=ruby:

Vagrant.configure("2") do |config|

    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true

    config.vm.box = "trusty64"

    config.vm.hostname = 'gitcolab.dev'
    config.vm.network :private_network, ip: '192.168.215.42'

    config.vm.synced_folder '.', '/var/www/gitcolab', type: 'nfs'

    config.hostmanager.aliases = %w(gitcolab.dev)

    #config.vm.provision :shell, :inline => $script
    config.vm.provision :shell do |shell|
        shell.path = "vagrant/bootstrap.sh"
    end

    config.vm.provision :puppet do |puppet|
        puppet.manifests_path = "vagrant/manifests"
        puppet.options = ['--verbose']
      end

    config.vm.provider 'vmware_fusion' do |v|
        v.vmx['memsize'] = 1024
        v.vmx['numvcpus'] = 1
    end

    config.vm.provider 'virtualbox' do |v|
        v.customize [ "modifyvm", :id, "--memory", "1024" ]
        v.cpus = 1
        v.name = "gitcolab"
    end
end