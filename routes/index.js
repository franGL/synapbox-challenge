const express = require('express');

const Tree = require('../models/Tree')
var router = express.Router();

router.get('/tree', async (req, res, next) => {
  const tree = await Tree.find({}).populate('children')
	res.send(tree)
});

router.post('/tree', async (req, res) => {
  try {
		const nodeTree = await Tree.findOne({ _id: req.body.parent })

    if (nodeTree) {
      const newNode = new Tree({
        label: req.body.label,
      })
  
      nodeTree.children.push(newNode);
      await nodeTree.save();
    } 

    res.send(nodeTree)
	} catch {
		res.status(404)
		res.send({ error: 'Node doesnt exist or couldnt be saved' })
	}
})

router.patch('/tree/:id', async (req, res) => {
	try {
		const nodeTree = await Tree.findOne({ _id: req.params.id })

		if (nodeTree && req.body.currentId) {
			nodeTree._id = req.body.currentId
      await nodeTree.save()
		}

		res.send(nodeTree)
	} catch {
		res.status(404)
		res.send({ error: 'Node doesnt exist!' })
	}
})

router.delete('/tree/:id', async (req, res) => {
	try {
    const findNode = await Tree.findOne({ _id: req.params.id }).populate('children');

    if(findNode && findNode.children.length == 0) {
      const nodeTree = await Tree.deleteOne({ _id: req.params.id })

      res.status(204)
      res.send(nodeTree)
    } else {
      res.status(404)
		  res.send({ error: 'Node cant be deleted!' })
    }
	} catch {
		res.status(404)
		res.send({ error: 'Node doesnt exist!' })
	}
})

module.exports = router;