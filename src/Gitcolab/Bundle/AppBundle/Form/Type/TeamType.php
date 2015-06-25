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
use Gitcolab\Bundle\AppBundle\Model\Team;

class TeamType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', null, ['required' => true])
            ->add('description', null, ['required' => false])
            ->add('access', 'choice' , [
                'expanded' => true,
                'choices' => [
                    Team::ACCESS_READ => 'gitcolab.team.access.read',
                    Team::ACCESS_WRITE => 'gitcolab.team.access.write',
                    Team::ACCESS_OWNER => 'gitcolab.team.access.admin'
                ]
            ])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'team';
    }
}