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

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormViewInterface;
use Symfony\Component\Form\AbstractType;

class ProfileType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('first_name', TextType::class, [
                'required' => false,
                'label' => 'gitcolab.user.first_name'
            ])
            ->add('last_name', TextType::class, [
                'required' => false,
                'label' => 'gitcolab.user.last_name'
            ])
            ->add('localization', TextType::class, [
                'required' => false,
                'label' => 'gitcolab.user.localization'
            ])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'profile';
    }
}
