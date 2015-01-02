<?php

namespace spec\Gitcolab\Bundle\AppBundle\EventListener\Doctrine;

use Doctrine\ORM\Event\LifecycleEventArgs;
use Gitcolab\Bundle\AppBundle\Model\Organization;
use Gitcolab\Bundle\AppBundle\Model\User\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Security\Core\Encoder\EncoderFactory;
use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;

class UserPasswordListenerSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Gitcolab\Bundle\AppBundle\EventListener\Doctrine\UserPasswordListener');
    }

    function let(EncoderFactory $encoderFactory)
    {
        $this->beConstructedWith($encoderFactory);
    }

    function it_should_ask_for_password_if_entity_is_instanceof_user(
        LifecycleEventArgs $event,
        User $user,
        EncoderFactory $encoderFactory,
        PasswordEncoderInterface $encoder
    ) {
        $event->getEntity()->willReturn($user);
        $user->getPlainPassword()->willReturn('a random password');
        $user->getSalt()->willReturn('salt')->shouldBeCalled();
        $user->setPassword('encoded password')->shouldBeCalled();
        $user->eraseCredentials()->shouldBeCalled();
        $encoderFactory->getEncoder($user)->shouldBeCalled()->willReturn($encoder);
        $encoder->encodePassword('a random password', 'salt')->shouldBeCalled()->willReturn('encoded password');

        $this->prePersist($event);
    }

    function it_should_not_ask_for_password_if_entity_is_not_instanceof_user(
        LifecycleEventArgs $event,
        Organization $organization,
        EncoderFactory $encoderFactory
    ) {
        $event->getEntity()->willReturn($organization);
        $encoderFactory->getEncoder(Argument::any())->shouldNotBeCalled();

        $this->prePersist($event);
    }
}
