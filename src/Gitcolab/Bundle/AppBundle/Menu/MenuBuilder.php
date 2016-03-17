<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Menu;

use Symfony\Component\Translation\TranslatorInterface;
use Knp\Menu\FactoryInterface;

class MenuBuilder
{

    public function __construct(FactoryInterface $factory, TranslatorInterface $translator)
    {
        $this->factory = $factory;
        $this->translator = $translator;
    }

    public function createTabUserSettings()
    {
        $menu = $this->factory->createItem('root');
        $menu->setChildrenAttribute('class', 'list-group list-group-flush');
        $menu
            ->addChild('Profile', array('route' => 'user_profile'))
            ->setAttribute('class', 'list-group-item');
        $menu
            ->addChild('Account', array('route' => 'user_account'))
            ->setAttribute('class', 'list-group-item');
        $menu
            ->addChild('SSH Keys', array('route' => 'user_keys'))
            ->setAttribute('class', 'list-group-item');

        return $menu;
    }

}
