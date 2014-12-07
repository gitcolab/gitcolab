<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Doctrine\Bundle\DoctrineBundle\DependencyInjection\Compiler\DoctrineOrmMappingsPass;
use Gitcolab\Bundle\AppBundle\DependencyInjection\Compiler\OverrideServiceCompilerPass;
use Gitcolab\Bundle\AppBundle\DependencyInjection\Compiler\GitcolabListenersPass;
use Gitcolab\Bundle\AppBundle\DependencyInjection\Compiler\LessPathPass;

class GitcolabAppBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        $container->addCompilerPass(new LessPathPass());
        $mappings = array(
            realpath(__DIR__ . '/Resources/config/doctrine/model') => 'Gitcolab\Bundle\AppBundle\Model',
        );

        $ormCompilerClass = 'Doctrine\Bundle\DoctrineBundle\DependencyInjection\Compiler\DoctrineOrmMappingsPass';

        if (class_exists($ormCompilerClass)) {
            $container->addCompilerPass(
                DoctrineOrmMappingsPass::createXmlMappingDriver(
                    $mappings,
                    array('gitcolab_app.model_manager_name'),
                    'gitcolab_app.backend_type_orm'
                ));
        }
    }
}
