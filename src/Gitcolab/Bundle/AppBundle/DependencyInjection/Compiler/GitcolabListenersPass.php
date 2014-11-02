<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class GitcolabListenersPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $definition = $container->getDefinition('gitcolab.event_dispatcher');

        //var_dump($container->findTaggedServiceIds('gitcolab.event_subscriber'));

        foreach ($container->findTaggedServiceIds('gitcolab.event_subscriber') as $id => $tags) {
            var_dump('ddd');
            $definition->addMethodCall('addSubscriberService', array($id, $container->getDefinition($id)->getClass()));
        }
    }
}