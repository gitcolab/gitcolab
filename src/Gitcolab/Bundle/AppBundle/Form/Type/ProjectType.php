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

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Gitcolab\Bundle\AppBundle\Repository\OrganizationRepository;

class ProjectType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('organization', EntityType::class, [
                'class' => 'GitcolabAppBundle:Organization',
                'query_builder' => function(OrganizationRepository $er) use($options) {
                    return $er->queryOrganizationsByUser($options['user_id']);
                },
                'required' => true,
                'label' => 'gitcolab.project.organization'
            ])
            ->add('name', TextType::class, [
                'required' => true,
                'label' => 'gitcolab.project.name'
            ])
            ->add('description', TextareaType::class, [
                'required' => false,
                'label' => 'gitcolab.project.description'
            ])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'user_id' => null,
            'data_class' => 'Gitcolab\Bundle\AppBundle\Model\Project',
        ));
    }

    public function getBlockPrefix()
    {
        return 'project';
    }
}
