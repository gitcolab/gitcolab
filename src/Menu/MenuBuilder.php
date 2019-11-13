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

use Knp\Menu\FactoryInterface;
use Knp\Menu\ItemInterface;

class MenuBuilder
{
    /** @var FactoryInterface */
    private $factory;

    public function __construct(FactoryInterface $factory)
    {
        $this->factory = $factory;
    }

    public function projectHead(): ItemInterface
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
            ->addChild('Settings', ['route' => 'project_setting'])
            ->setAttribute('class', 'nav-item');

        return $menu;
    }

    public function createTabUserSettings(): ItemInterface
    {
        $menu = $this->factory->createItem('root');
        $menu->setChildrenAttribute('class', 'list-group list-group-flush');
        $menu
            ->addChild('Profile', ['route' => 'user_profile'])
            ->setAttribute('class', 'list-group-item');
        $menu
            ->addChild('Account', ['route' => 'user_account'])
            ->setAttribute('class', 'list-group-item');
        $menu
            ->addChild('SSH Keys', ['route' => 'user_keys'])
            ->setAttribute('class', 'list-group-item');

        return $menu;
    }
}
