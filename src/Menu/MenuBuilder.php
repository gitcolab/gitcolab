<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Menu;

use Symfony\Component\Translation\TranslatorInterface;
use Knp\Menu\FactoryInterface;

class MenuBuilder
{
    /**
     * MenuBuilder constructor.
     * @param FactoryInterface $factory
     * @param TranslatorInterface $translator
     */
    public function __construct(FactoryInterface $factory, TranslatorInterface $translator)
    {
        $this->factory = $factory;
        $this->translator = $translator;
    }

    /**
     * @return \Knp\Menu\ItemInterface
     */
    public function projectHead()
    {

        $menu = $this->factory->createItem('root');
        $menu->setChildrenAttribute('class', 'list-group list-group-flush');
        $menu
            ->addChild('Code', ['route' => 'user_profile'])
            ->setAttribute('class', 'nav-item');

        $menu
            ->addChild('Issues', ['route' => 'issue_list'])
            ->setAttribute('class', 'nav-item');

        $menu
            ->addChild('Pull Requests', ['uri' => '#'])
            ->setAttribute('class', 'nav-item');

        $menu
            ->addChild('Settings', array('route' => 'project_setting'))
            ->setAttribute('class', 'nav-item');

        return $menu;
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
