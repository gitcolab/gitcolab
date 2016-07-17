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

use Sylius\Bundle\ResourceBundle\AbstractResourceBundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Doctrine\Bundle\DoctrineBundle\DependencyInjection\Compiler\DoctrineOrmMappingsPass;
use Sylius\Bundle\ResourceBundle\SyliusResourceBundle;
use Gitcolab\Bundle\AppBundle\DependencyInjection\Compiler\GitUrlGeneratorPass;
use Gitcolab\Bundle\AppBundle\DependencyInjection\Compiler\LessPathPass;

class GitcolabAppBundle extends AbstractResourceBundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(new GitUrlGeneratorPass());

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

    /**
     * {@inheritDoc}
     */
    public function getSupportedDrivers()
    {
        return array(
            SyliusResourceBundle::DRIVER_DOCTRINE_ORM
        );
    }
    /**
     * {@inheritDoc}
     */
    protected function getDoctrineMappingDirectory()
    {
        return 'model';
    }
    /**
     * {@inheritDoc}
     */
    protected function getModelNamespace()
    {
        return 'Gitcolab\Bundle\AppBundle\Model';
    }
}
