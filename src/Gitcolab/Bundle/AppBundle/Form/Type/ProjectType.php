<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Gitcolab\Bundle\AppBundle\Repository\OrganizationRepository;

class ProjectType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('organization', 'entity', array(
                'class' => 'GitcolabAppBundle:Organization',
                'query_builder' => function(OrganizationRepository $er) use($options) {
                    return $er->queryOrganizationsByUser($options['user_id']);
                }
            ))
            ->add('name')
            ->add('description', null, array('required' => false))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'user_id' => null,
            'data_class' => 'Gitcolab\Bundle\AppBundle\Model\Project',
        ));
    }

    public function getName()
    {
        return 'project';
    }
}
