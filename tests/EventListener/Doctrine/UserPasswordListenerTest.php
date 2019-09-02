<?php

namespace Tests\Gitcolab\EventListener\Doctrine;

use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Encoder\EncoderFactory;
use Symfony\Component\Security\Core\Encoder\BCryptPasswordEncoder;
use Gitcolab\EventListener\Doctrine\UserPasswordListener;
use Gitcolab\Model\User;

class UserPasswordListenerTest extends \PHPUnit_Framework_TestCase
{
    public function testUpdateUserFields()
    {
        $encoder = $this->getMockBuilder(EncoderFactory::class)->disableOriginalConstructor()->getMock();
        $bcryptPasswordEncoder = $this->getMockBuilder(BCryptPasswordEncoder::class)->disableOriginalConstructor()->getMock();
        $lifecycleEventArgs = $this->getMockBuilder(LifecycleEventArgs::class)->disableOriginalConstructor()->getMock();

        $encoder->method('getEncoder')
            ->willReturn($bcryptPasswordEncoder);

        $bcryptPasswordEncoder->method('encodePassword')
            ->willReturn('IgStQQkPPJ5RQCBYF5PrlCLRjGUYrR9+M8/xhTb22ILeJGvVyYhmqJRWJZMzQDnnvzn+gxdfwOM0RQ0GpBpnVw==');

        $user = $this->makeUser();
        $user->setPlainPassword('test');

        $lifecycleEventArgs->method('getEntity')
            ->willReturn($user);

        $userListener = new UserPasswordListener($encoder);
        $userListener->prePersist($lifecycleEventArgs);

        $this->assertEquals($user->getPassword(), 'IgStQQkPPJ5RQCBYF5PrlCLRjGUYrR9+M8/xhTb22ILeJGvVyYhmqJRWJZMzQDnnvzn+gxdfwOM0RQ0GpBpnVw==');
    }

    public function makeUser()
    {
        $user = (new User())
            ->setPassword('$2y$13$53m518vtm0gsko0kgk0oweJXOmFl3tCNfM2hW7fJ.O1rRWwXYxuWe');

        return $user;
    }
}
