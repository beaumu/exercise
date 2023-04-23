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
class VideoController extends AbstractController
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

        return $this->json(array_map(function ($video) {
            return [
                'id' => $video->getId(),
                'url' => $video->getUrl(),
                'title' => $video->getTitle(),
                'description' => $video->getDescription(),
            ];
        }, $repository->findAll()));
    }

    /**
     * Add new video
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
        
        return $this->json([
            'id' => $video->getId(),
            'url' => $video->getUrl(),
            'title' => $video->getTitle(),
            'description' => $video->getDescription(),
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
        
        if (!is_null($video = $repository->find($id))) {
            return $this->json([
                'id' => $video->getId(),
                'url' => $video->getUrl(),
                'title' => $video->getTitle(),
                'description' => $video->getDescription(),
            ]);
        }

        return null;
    }
}
