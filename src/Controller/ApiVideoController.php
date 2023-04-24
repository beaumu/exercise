<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Video;

/**
 * Controller class to handle video API calls
 */
class ApiVideoController extends AbstractController
{
    /**
     * Return list of videos
     *
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     */
    #[Route('/api/videos', name: 'video_list', methods: ['GET'])]
    public function list(EntityManagerInterface $entityManager): JsonResponse
    {
        $repository = $entityManager->getRepository(Video::class);

        return $this->json($repository->findAll(), 200, [], [
            'groups' => ['video']
        ]);
    }

    /**
     * Add new video and return data of added video
     *
     * @param EntityManagerInterface $entityManager
     * @param Request $request
     * @return JsonResponse
     */
    #[Route('/api/videos', name: 'video_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $video = new Video();
        $video->setUrl($request->get('url'));
        $video->setTitle($request->get('title'));
        $video->setDescription($request->get('description'));

        $entityManager->persist($video);
        $entityManager->flush();

        return $this->json($video, 200, [], [
            'groups' => ['video']
        ]);
    }

    /**
     * Delete video and return data of deleted video
     *
     * @param EntityManagerInterface $entityManager
     * @param Request $request
     * @return JsonResponse
     */
    #[Route('/api/videos/{id}', name: 'video_remove', methods: ['DELETE'])]
    public function remove(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $video = $entityManager->getRepository(Video::class)->find($id);
        if (is_null($video)) {
            throw $this->createNotFoundException("Video '$id' not found");
        }

        $entityManager->remove($video);
        $entityManager->flush();

        return $this->json($video, 200, [], [
            'groups' => ['video']
        ]);
    }

    /**
     * Show video by id
     *
     * @param EntityManagerInterface $entityManager
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/api/videos/{id}', name: 'video_show')]
    public function show(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $repository = $entityManager->getRepository(Video::class);

        $video = $repository->find($id);

        return $this->json($video, 200, [], [
            'groups' => ['video']
        ]);
    }

    /**
     * See if video is liked
     *
     * @param EntityManagerInterface $entityManager
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/api/videos/{id}/liked', name: 'video_liked', methods: ['GET'])]
    public function isLiked(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $video = $entityManager->getRepository(Video::class)->find($id);

        if (is_null($video)) {
            throw $this->createNotFoundException("Video '$id' not found");
        }

        return $this->json($video->isLiked());
    }

    /**
     * Like/dislike video
     *
     * @param EntityManagerInterface $entityManager
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/api/videos/{id}/liked', name: 'video_like', methods: ['POST'])]
    public function setLiked(EntityManagerInterface $entityManager, int $id, Request $request): JsonResponse
    {
        $video = $entityManager->getRepository(Video::class)->find($id);

        if (is_null($video)) {
            throw $this->createNotFoundException("Video '$id' not found");
        }

        $video->setLiked((bool) (int) $request->get('liked'));
        $entityManager->flush();

        return $this->json($video->isLiked());
    }
}
