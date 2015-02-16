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

class LessPathPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $lessAsseticFilter = $container->getDefinition('assetic.filter.less');
        $kernelRootDir = $container->getParameter('kernel.root_dir').'/../web';
        $lessAsseticFilter->addMethodCall('addLoadPath', array($kernelRootDir));
    }
}
