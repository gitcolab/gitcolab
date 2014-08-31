<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Controller;

use FOS\RestBundle\View\View;

class KeyController extends Controller
{
    public function discoverAction($key)
    {
        $key = $this->getDoctrine()->getManager()->getRepository('GitcolabAppBundle:Key')->find($key);

        $view = View::create();
        $view->setData($key);

        return $view;
    }
}